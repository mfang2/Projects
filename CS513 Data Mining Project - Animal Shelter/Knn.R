rm(list=ls())

# Loading the dataset 
aacData_2 <- read.csv("C:/Users/harsh/Desktop/Fall 2018/Knowledge Discovery & Data Mining/Project/aacData_2.csv")
#View(aacData_2)

# Exploratory Data Analysis
str(aacData_2)
summary(aacData_2)

# Converting factors to numeric
aacData_2$sex_upon_outcome <- as.numeric(factor(aacData_2$sex_upon_outcome, levels = c("Intact Female", "Intact Male", "Neutered Male", "Spayed Female", "Unknown"), labels = c("1", "2", "3", "4", "5")))

aacData_2$outcome_weekday <- as.numeric(factor(aacData_2$outcome_weekday, levels = c("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"), labels = c("1", "2", "3", "4", "5", "6", "7")))

aacData_2$animal_type <- as.numeric(factor(aacData_2$animal_type, levels = c("Dog", "Cat", "Bird", "Other"), labels = c("1", "2", "3", "4")))

aacData_2$intake_condition <- as.numeric(factor(aacData_2$intake_condition, levels = c("Aged", "Feral", "Injured", "Normal", "Nursing", "Pregnant", "Sick", "Other"), labels = c("1", "2", "3", "4", "5", "6", "7", "8")))

aacData_2$intake_type <- as.numeric(factor(aacData_2$intake_type, levels = c("Euthanasia Request", "Owner Surrender", "Public Assist", "Stray", "Wildlife"), labels = c("1", "2", "3", "4", "5")))

aacData_2$sex_upon_intake <- as.numeric(factor(aacData_2$sex_upon_intake, levels = c("Intact Female", "Intact Male", "Neutered Male", "Spayed Female", "Unknown"), labels = c("1", "2", "3", "4", "5")))

aacData_2$intake_weekday <- as.numeric(factor(aacData_2$intake_weekday, levels = c("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"), labels = c("1", "2", "3", "4", "5", "6", "7")))

# Created normalization function to normalize the data
normalize <- function(x){
  return ((x - min(x))/(max(x) - min(x)))
}

# Applying the normalization function to Predictor variables.
aacData2_new <- as.data.frame(lapply(aacData_2[, c(2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21)], normalize))

# Normalized dataset
aacData2_norm <- as.data.frame(cbind(outcome_type = aacData_2$outcome_type,aacData2_new))
# View(aacData2_norm)

# str(aacData2_norm)
# summary(aacData2_norm)

# Applying K-Nearest Neighborhood Algorithm     ####
# install.packages("kknn")
# install.packages("caret")

library(kknn)
library(caret)

# Creating a test dataset with 25% of the data. 
# The remaining 75% of data is used as training dataset.
index <- sample(nrow(aacData2_norm),as.integer(.25*nrow(aacData2_norm)))
test <- aacData2_norm[index,]              # Test dataset
training <- aacData2_norm[-index,]         # Training dataset

# Using K = 1 to K = 15 to classify the test dataset     ####
for(i in c(1:15)){
  predict <- kknn(formula = outcome_type~., training, test, kernel="rectangular", k=i)
  fit <- fitted(predict)
  wrong <- (test[,1] != fit)
  rate <- sum(wrong)/length(wrong)
  print(paste("Rate -", rate))
  CM <- table(Test = test[,1],Prediction = fit)
  accuracy <- sum(diag(CM))/sum(CM)
  print(paste("Accuracy -", accuracy))
}

# From the observation of error rate and accuracy (Measure of the performance of knn) for K = 1 to K = 15, 
# the optimal accuracy (74.3%) and minimum error rate (25.6%) is found when k = 12.  ####

# Optimal results are at k=12
predict <- kknn(formula = outcome_type~., training, test, k=12, kernel="rectangular")
fit <- fitted(predict)    
fit

# Measure of the performance of knn
wrong<- (test[,1]!=fit)
rate<-sum(wrong)/length(wrong)
print(paste("Rate -", rate))

CM <- table(Test=test[,1],Prediction = fit)
accuracy <- sum(diag(CM))/sum(CM)
print(paste("Acurracy -", accuracy))

# Confusion Matrix
confusion.Matrix <- confusionMatrix(CM)
confusion.Matrix
