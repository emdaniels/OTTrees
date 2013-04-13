import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class MassageKML { 

	public static void massageData(String inputFile, String outputDir) {
		FileReader file1 = null;
		BufferedReader reader = null;

		Map<String, BufferedWriter> treeNames = new HashMap<String, BufferedWriter>();
		
		String line = "";
		
		try {
			file1 = new FileReader(inputFile);
			reader = new BufferedReader(file1);
			
			while ((line = reader.readLine()) != null) {
				
				if (line.contains("SPECIES")) {
					boolean speciesFound = false;
					
					while ((line = reader.readLine()) != null && !speciesFound) {
						
						if (line.contains("<td>")) {
							String speciesLine = line.replaceAll("<td>", "").replaceAll("</td>", "").replaceAll(" Species", "").replaceAll("( )+", "_");
							speciesFound = true;
							
							if (!"".equals(speciesLine) && !treeNames.containsKey(speciesLine)) {
								FileWriter treeSpeciesFile = new FileWriter(outputDir + speciesLine + ".kml");
								BufferedWriter treeSpeciesWriter = new BufferedWriter(treeSpeciesFile);
								
								treeSpeciesWriter.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
								treeSpeciesWriter.write("<kml xmlns=\"http://www.opengis.net/kml/2.2\" "
										+ "xmlns:gx=\"http://www.google.com/kml/ext/2.2\" "
										+ "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" "
										+ "xsi:schemaLocation=\"http://www.opengis.net/kml/2.2 "
										+ "http://schemas.opengis.net/kml/2.2.0/ogckml22.xsd "
										+ "http://www.google.com/kml/ext/2.2 "
										+ "http://code.google.com/apis/kml/schema/kml22gx.xsd\">\n");
								treeSpeciesWriter.write("<Document id=\"TreeInventory2011\">\n");
								
								treeNames.put(speciesLine, treeSpeciesWriter);
							}
						}
					}
				}
			}
			
			reader.close();
			file1.close();
			
			file1 = new FileReader(inputFile);
			reader = new BufferedReader(file1);

			int i = 0;
			
			String tempLine = "";
			String speciesLine = "";
			String descriptionLine = "";
			String iconLine = "";
			String speciesName = "";

			while ((line = reader.readLine()) != null && i < 100) {
				if (i > 0) 
				System.out.println(line);

				if (line.contains("<Placemark") || line.contains("coordinates")
						|| line.contains("<Point>") ||  line.contains("</Point>")) {
					tempLine += line;
				}
				
				if (line.contains("SPECIES")) {
					
					while ((line = reader.readLine()) != null) {
						if (i > 0) 
						System.out.println(line);
						
						if (line.contains("<td>")) {
							speciesLine = line.replaceAll("<td>", "").replaceAll("</td>", "").replaceAll(" Species", "").replaceAll("( )+", "_");
							String[] speciesArray = speciesLine.split("_");
							
							for (int j = speciesArray.length - 1; j >= 0; j--) {
								speciesName += speciesArray[j];
								
								if (j > 0) {
									speciesName += " ";
								}
							}
							
							break;
						}
					}
				}
				
				if (line.contains("ADDNUM")) {
					
					while ((line = reader.readLine()) != null) {
						if (i > 0) 
						System.out.println(line);
						
						if (line.contains("<td>")) {
							descriptionLine += "<p>" + line.replaceAll("<td>", "").replaceAll("</td>", "").replaceAll("( )+", " ");
							break;
						}
					}
				}
				
				if (line.contains("ADDSTR")) {
					
					while ((line = reader.readLine()) != null) {
						if (i > 0) 
						System.out.println(line);
						
						if (line.contains("<td>")) {
							descriptionLine += " " + line.replaceAll("<td>", "").replaceAll("</td>", "").replaceAll("( )+", " ") + "</p>";
							break;
						}
					}
				}
				
				if (line.contains("</description>")) {
					tempLine += "<name>" + speciesName + "</name>";
					tempLine += "<description><![CDATA[" + descriptionLine + "]]></description>";
				}
				
				if (line.contains("</Placemark")) {
					iconLine = "<Style><IconStyle><Icon><href>http://www.iconeasy.com/icon/thumbnails/Kids/Freestyle%20Icons/Tree%20Icon.jpg</href></Icon></IconStyle></Style>";
					tempLine += iconLine;
					tempLine += line;
					
					BufferedWriter treeSpeciesWriter = treeNames.get(speciesLine);
					
					if (treeSpeciesWriter != null) {
						treeSpeciesWriter.write(tempLine);
					}
					
					tempLine = "";
					speciesLine = "";
					descriptionLine = "";
					iconLine = "";
					speciesName ="";
					//i++;
				}
			}
			
			Iterator<String> itr = treeNames.keySet().iterator();
			
			while (itr.hasNext()) {
				String treeName = itr.next();
				BufferedWriter treeSpeciesWriter = treeNames.get(treeName);
				treeSpeciesWriter.write("</Document>");
				treeSpeciesWriter.write("</kml>");
				treeSpeciesWriter.close();
				
				//System.out.print("'" + treeName + "', ");
			}

		} catch (FileNotFoundException e) {
			throw new RuntimeException("File not found");
		} catch (IOException e) {
			throw new RuntimeException("IO Error occured");
		} finally {
			
			try {
				
				if (file1 != null) {
					file1.close();
				}
			} catch  (IOException e){
				throw new RuntimeException("IO Error occured closing file reader");
			}

			try {
				
				if (reader != null) {
					reader.close();
				}
			} catch  (IOException e){
				throw new RuntimeException("IO Error occured closing buffered reader");
			}
		}
	}

	public static void main(String[] args) {
		String inputFile = "data/doc.kml";
		String outputDir = "data/trees/";
		
		massageData(inputFile, outputDir);
		
		System.out.println("done");
	}
}