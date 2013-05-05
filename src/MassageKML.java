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
								
								String[] currentTree = treeStats.get(backwardSpeciesName);
								
								if (currentTree != null) {
									FileWriter treeSpeciesFile = new FileWriter(outputDir + speciesLine + ".kml");
									BufferedWriter treeSpeciesWriter = new BufferedWriter(treeSpeciesFile);
									
									treeSpeciesWriter.write("<name>" + speciesName + "</name>");
									treeSpeciesWriter.write("<filename>" + speciesLine + "</filename>");
									
									for (int j = 0; j < labels.length; j++) {
										treeSpeciesWriter.write("<" + labels[j] + ">" + currentTree[j] + "</" + labels[j] + ">");
									}
									
									treeNames.put(speciesLine, treeSpeciesWriter);
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
				
				// adds the address number to the description
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
				
				// adds the address to the description
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
				
				// adds the diameter at breast height to the dbh line
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
				
				// inserts the dbh and description tags to the kml
				if (line.contains("</description>")) {
					
					String backwardSpeciesName = speciesLine.replaceAll("_", " ");
					
					String[] currentTree = treeStats.get(backwardSpeciesName);
					
					int growthFactor = 0;
					int maxSpan = 0;
					int matDBH = 0;
					int estimatedAge = 1;
					int estimatedSpan = 0;
					
					if (currentTree != null) {
						
						for (int j = 0; j < labels.length; j++) {
							
							if ("matDBH".equals(labels[j])) {
								//System.out.println(speciesLine + " -- " + labels[j] + " = " +  currentTree[j]);
								matDBH = Integer.parseInt(currentTree[j]);
							}
							
							if ("growthFactor".equals(labels[j])) {
								//System.out.println(speciesLine + " -- " + labels[j] + " = " +  currentTree[j]);
								growthFactor = Integer.parseInt(currentTree[j]);
							}
							
							if ("maxSpan".equals(labels[j])) {
								//System.out.println(speciesLine + " -- " + labels[j] + " = " +  currentTree[j]);
								maxSpan = Integer.parseInt(currentTree[j]);
							}
						}
					}
					
					//System.out.println(speciesLine + " -- dbh = " + dbhLine);
					
					try {
						estimatedAge = Integer.parseInt(dbhLine.trim()) * growthFactor; // dbh * growthFactor
					} catch (NumberFormatException e) {
						// do nothing
					}
					
					if (estimatedAge == 0) {
						estimatedAge = 1;
					}
					
					if (maxSpan == 0) {
						maxSpan = 1;
					}
					
					if (matDBH == 0) {
						matDBH = 1;
					}
					
					//System.out.println(speciesLine + " maxSpan = " +  maxSpan);
					//System.out.println(speciesLine + " matDBH = " +  matDBH);
					//System.out.println(speciesLine + " growthFactor = " +  growthFactor);
					//System.out.println(speciesLine + " estimatedAge = " +  estimatedAge);
					//System.out.println(speciesLine + " estimatedSpan = " +  estimatedSpan);
					
					estimatedSpan = maxSpan * estimatedAge / matDBH; //  maxSpan * (estimatedAge) / matDBH 
					if (estimatedSpan > maxSpan)
						estimatedSpan = maxSpan;
					tempLine += "<dbh>" + dbhLine + "</dbh>";
					tempLine += "<estimatedAge>" + estimatedAge + "</estimatedAge>";
					tempLine += "<estimatedSpan>" + estimatedSpan + "</estimatedSpan>";
					tempLine += "<description><![CDATA[" + descriptionLine + "]]></description>";
				}
				
				if (line.contains("</Placemark")) {
					tempLine += line;
					
					BufferedWriter treeSpeciesWriter = treeNames.get(speciesLine);
					
					if (treeSpeciesWriter != null) {
						treeSpeciesWriter.write(tempLine);
					}
					
					tempLine = ""; 
					speciesLine = "";
					descriptionLine = "";
					dbhLine = "";
					speciesName ="";
				}
				
				//i++;
			}
			
			Iterator<String> itr = treeNames.keySet().iterator();
			
			while (itr.hasNext()) {
				String treeName = itr.next();
				BufferedWriter treeSpeciesWriter = treeNames.get(treeName);
				
				if (treeSpeciesWriter != null) {
					treeSpeciesWriter.close();
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