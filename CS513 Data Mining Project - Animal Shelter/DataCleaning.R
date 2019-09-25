rm(list=ls())

# Loading the original dataset
aacData <- read.csv("C:/Users/harsh/Desktop/Fall 2018/Knowledge Discovery & Data Mining/Project/AAC Shelter Intakes and Outcomes/aac_intakes_outcomes.csv");

# Exploratory Data Analysis
summary(aacData)
str(aacData)
head(aacData) 

#Removing null values from traget variable "outcome_type"
aacData <- subset(aacData, outcome_type != "")

# Creating subset of the dataset by removing columns such as age_upon_outcome, date_of_birth, etc. which already has prased values into columns age_upon_outcome_.days., age_upon_outcome_.years., dob_year, dob_month, etc.
aacData_1 <- subset(aacData, select = -c(1:4, 10, 13, 19:21, 23:25, 29, 33, 36, 40))  

# Columns sex_upon_intake and sex_upon_outcome has 1 null value for the same observation, so we changed it's value to "Unknown" 
aacData_1$sex_upon_intake[aacData_1$sex_upon_intake == ""] <- "Unknown"
aacData_1$sex_upon_outcome[aacData_1$sex_upon_outcome == "NULL"] <- "Unknown"

# Writing the cleaned dataset to csv file
write.csv(aacData_1, "C:/Users/harsh/Desktop/Fall 2018/Knowledge Discovery & Data Mining/Project/aacData_1.csv")

aacData_1 <- read.csv("C:/Users/harsh/Desktop/Fall 2018/Knowledge Discovery & Data Mining/Project/aacData_1.csv")

# Exploratory Data Analysis
View(aacData_1)
summary(aacData_1)
str(aacData_1)
