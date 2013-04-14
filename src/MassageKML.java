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

	public static void massageData(String inputFile1, String inputFile2, String outputDir) {
		FileReader file1 = null;
		FileReader csvFile = null;
		BufferedReader reader = null;

		Map<String, BufferedWriter> treeNames = new HashMap<String, BufferedWriter>();
		Map<String, String[]> treeStats = new HashMap<String, String[]>();
		String[] labels = null;
		boolean firstLine = true;
		
		String line = "";
		String speciesName = "";
		
		try {
			csvFile = new FileReader(inputFile2);
			reader = new BufferedReader(csvFile);
			
			while ((line = reader.readLine()) != null) {
				String[] currentLine = line.split(",");
				
				if (firstLine) {
					firstLine = false;
					labels = currentLine;
				} else {
					treeStats.put(currentLine[0], currentLine);
					//System.out.println(currentLine[0]);
				}
			}
			
			csvFile.close();
			reader.close();
			
			file1 = new FileReader(inputFile1);
			reader = new BufferedReader(file1);
			
			while ((line = reader.readLine()) != null) {
				
				if (line.contains("SPECIES")) {
					boolean speciesFound = false;
					
					while ((line = reader.readLine()) != null && !speciesFound) {
						
						if (line.contains("<td>")) {
							String speciesLine = line.replaceAll("<td>", "").replaceAll("</td>", "").replaceAll(" Species", "").replaceAll("( )+", "_");
							
							speciesLine = speciesLine.replaceAll("Ironwod", "Ironwood").replaceAll("Katsura_tree", "Katsura_Tree");
							
							speciesFound = true;

							if (!"".equals(speciesLine) && !treeNames.containsKey(speciesLine)) {
								String[] speciesArray = speciesLine.split("_");
								
								for (int j = speciesArray.length - 1; j >= 0; j--) {
									speciesName += speciesArray[j];
									
									if (j > 0) {
										speciesName += " ";
									}
								}
								
								String backwardSpeciesName = speciesLine.replaceAll("_", " ");
								
								//System.out.print(speciesName + " -> ");
								
								String[] currentTree = treeStats.get(backwardSpeciesName);
								
								if (currentTree != null) {
									//System.out.println("found!");
									FileWriter treeSpeciesFile = new FileWriter(outputDir + speciesLine + ".kml");
									BufferedWriter treeSpeciesWriter = new BufferedWriter(treeSpeciesFile);
									
									/*treeSpeciesWriter.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
									treeSpeciesWriter.write("<kml xmlns=\"http://www.opengis.net/kml/2.2\" "
											+ "xmlns:gx=\"http://www.google.com/kml/ext/2.2\" "
											+ "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" "
											+ "xsi:schemaLocation=\"http://www.opengis.net/kml/2.2 "
											+ "http://schemas.opengis.net/kml/2.2.0/ogckml22.xsd "
											+ "http://www.google.com/kml/ext/2.2 "
											+ "http://code.google.com/apis/kml/schema/kml22gx.xsd\">\n");
									treeSpeciesWriter.write("<Document id=\"TreeInventory2011\">\n");*/
									
									treeSpeciesWriter.write("<name>" + speciesName + "</name>");
									treeSpeciesWriter.write("<filename>" + speciesLine + "</filename>");
									
									for (int j = 0; j < labels.length; j++) {
										treeSpeciesWriter.write("<" + labels[j] + ">" + currentTree[j] + "</" + labels[j] + ">");
									}
									
									treeNames.put(speciesLine, treeSpeciesWriter);
								} else {
									//System.out.print(backwardSpeciesName + " -> ");
									//System.out.println("not found!");
								}
								
								speciesName = "";
							}
						}
					}
				}
			}
			
			reader.close();
			file1.close();
			
			file1 = new FileReader(inputFile1);
			reader = new BufferedReader(file1);

			int i = 0;
			
			String tempLine = "";
			String speciesLine = "";
			String descriptionLine = "";
			String dbhLine = "";
			//String iconLine = "";
			speciesName = "";

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
							descriptionLine += line.replaceAll("<td>", "").replaceAll("</td>", "").replaceAll("( )+", " ");
							break;
						}
					}
				}
				
				if (line.contains("ADDSTR")) {
					
					while ((line = reader.readLine()) != null) {
						if (i > 0) 
						System.out.println(line);
						
						if (line.contains("<td>")) {
							descriptionLine += " " + line.replaceAll("<td>", "").replaceAll("</td>", "").replaceAll("( )+", " ");
							break;
						}
					}
				}
				
				if (line.contains("DBH")) {
					
					while ((line = reader.readLine()) != null) {
						if (i > 0) 
						System.out.println(line);
						
						if (line.contains("<td>")) {
							dbhLine += " " + line.replaceAll("<td>", "").replaceAll("</td>", "").replaceAll("( )+", " ");
							break;
						}
					}
				}
				
				if (line.contains("</description>")) {
					//tempLine += "<name>" + speciesName + "</name>";
					tempLine += "<dbh>" + dbhLine + "</dbh>";
					tempLine += "<description><![CDATA[" + descriptionLine + "]]></description>";
				}
				
				if (line.contains("</Placemark")) {
					//iconLine = "<Style><IconStyle><Icon><href>http://www.iconeasy.com/icon/thumbnails/Kids/Freestyle%20Icons/Tree%20Icon.jpg</href></Icon></IconStyle></Style>";
					//tempLine += iconLine;
					tempLine += line;
					
					BufferedWriter treeSpeciesWriter = treeNames.get(speciesLine);
					
					if (treeSpeciesWriter != null) {
						treeSpeciesWriter.write(tempLine);
					}
					
					tempLine = ""; 
					speciesLine = "";
					descriptionLine = "";
					dbhLine = "";
					//iconLine = "";
					speciesName ="";
					//i++;
				}
			}
			
			Iterator<String> itr = treeNames.keySet().iterator();
			
			while (itr.hasNext()) {
				String treeName = itr.next();
				BufferedWriter treeSpeciesWriter = treeNames.get(treeName);
				
				if (treeSpeciesWriter != null) {
					/*treeSpeciesWriter.write("</Document>");
					treeSpeciesWriter.write("</kml>");*/
					treeSpeciesWriter.close();

					//System.out.print("'" + treeName + "', ");
				}
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
		String inputFile1 = "data/doc.kml";
		String inputFile2 = "data/listOfSpecies.csv";
		String outputDir = "data/trees/kml/";
		
		massageData(inputFile1, inputFile2, outputDir);
		
		System.out.println("done");
	}
}