rm(list=ls())

# Loading the cleaned dataset 
aacData_1 <- read.csv("C:/Users/harsh/Desktop/Fall 2018/Knowledge Discovery & Data Mining/Project/aacData_1.csv")
# View(aacData_1)

# Applying Random Forest Algorithm to the dataset ####
library(randomForest)

# Creating a test dataset with 25% of the data. 
# The remaining 75% of data is used as training dataset.
index <- sample(nrow(aacData_1),as.integer(.25*nrow(aacData_1)))
test <- aacData_1[index,]        # Test dataset
training <- aacData_1[-index,]   # Training dataset

# Creating the model
fit <- randomForest( factor(outcome_type)~., data=training, importance=TRUE, ntree=1000)
importance(fit)
varImpPlot(fit)

# Applying the model to the test dataset and predicting the outcome_type of the test dataset
Prediction <- predict(fit, test)

# Table depicting Actual and Predicted Values 
tableRF <- table(Actual = test$outcome_type, Prediction = Prediction)

# Calculating error rate
wrong <- (test$outcome_type != Prediction)
error <- sum(wrong)/length(wrong)
error

#install.packages("caret")
library(caret)

# Confusion Matrix
CM <- confusionMatrix(tableRF)
CM

# Accuracy with Dataset 1 is 83.29% ####

#### From the implemention of first the random forest classifier we found 24 important features valuable to our classification model. ####
# We decided to go with the first 20 important features and eliminated the rest 4 features. ####
# We applied the random forest classifier again to this new subset with 20 predictor variables and 1 target variable (outcome_type). ####

# Loading the cleaned dataset
aacData_1 <- read.csv("C:/Users/harsh/Desktop/Fall 2018/Knowledge Discovery & Data Mining/Project/aacData_1.csv")

# Creating the subset of dataset based on the first 20 important features given by the random forest classifier
aacData_2 <- subset(aacData_1, select = -c(5, 10, 19, 24))

# Writing the final dataset into csv file
write.csv(aacData_2, "C:/Users/harsh/Desktop/Fall 2018/Knowledge Discovery & Data Mining/Project/aacData_2.csv")

# Applying Random Forest Algorithm to the dataset
library(randomForest)

# Creating a test dataset with 25% of the data. 
# The remaining 75% of data is used as training dataset.
index <- sample(nrow(aacData_2),as.integer(.25*nrow(aacData_2)))
test <- aacData_2[index,]           # Test dataset
training <- aacData_2[-index,]      # Training dataset

# Creating the model
fit <- randomForest( factor(outcome_type)~., data=training, importance=TRUE, ntree=1000)
importance(fit)
varImpPlot(fit)

# Applying the model to the test dataset and predicting the outcome_type of the test dataset
Prediction <- predict(fit, test)

# Table depicting Actual and Predicted Values 
tableRF <- table(Actual = test$outcome_type, Prediction = Prediction)

# Calculating error rate
wrong <- (test$outcome_type != Prediction)
error <- sum(wrong)/length(wrong)
error

library(caret)

# Confusion Matrix
CM <- confusionMatrix(tableRF)
CM

# Accuracy with Dataset 2 is 83.24% ####

# After running the  random forest classifier on both the first dataset (aacData_1.csv) and the subset with 20 important features (aacData_2),   ####
#we can see that the accuracy is not affected much with the elimination of those 4 features. ####
# So, we decided to use those 20 important features to use as the predictor variables for the rest of the models. ####
