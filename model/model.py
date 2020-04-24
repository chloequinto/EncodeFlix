# Note: Only if you have a GPU
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import pandas as pd 
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error as MSE 
import tensorflow as tf
import numpy as np


sess = tf.Session()

def preprocess(): 
    '''
    Preprocess Movies CSV file and return a pivot table 
    '''

    df = pd.read_csv("./data/ml-1m/ratings.dat", header = None, sep="::", engine="python", encoding="latin-1")
    df = df.rename(columns = {0: "userID", 1: "movieID", 2: "ratings", 3: "timestamp"})
    df = df.drop(["timestamp"], axis = 1)
    ratings_pivot = pd.pivot_table(df[["userID", "movieID", "ratings"]], values = "ratings", index="userID", columns="movieID").fillna(0)

    return ratings_pivot 

def training(ratings_pivot): 
    '''
    Build AutoEncoder Network and trains 
    '''
    global sess
    xtrain, xtest = train_test_split(ratings_pivot, train_size=0.8)

    inputLayer_nodes = xtrain.shape[1]
    hiddenLayer_nodes = 256
    outputLayer_nodes = xtrain.shape[1]

    hiddenLayer_weights = {'weights': tf.Variable(tf.random_normal([inputLayer_nodes+1, hiddenLayer_nodes]))}
    outputLayer_weights = {'weights': tf.Variable(tf.random_normal([hiddenLayer_nodes+1, outputLayer_nodes]))}


    inputLayer = tf.placeholder('float', [None, xtrain.shape[1]])
    inputLayer_const = tf.fill([tf.shape(inputLayer)[0], 1], 1.0)
    inputLayer_concat = tf.concat([inputLayer, inputLayer_const],1)

    hiddenLayer = tf.nn.sigmoid(tf.matmul(inputLayer_concat, hiddenLayer_weights["weights"]))
    hiddenLayer_const = tf.fill([tf.shape(hiddenLayer)[0],1],1.0)
    hiddenLayer_concat = tf.concat([hiddenLayer, hiddenLayer_const],1)

    outputLayer = tf.matmul(hiddenLayer_concat, outputLayer_weights["weights"])
    outputValue = tf.placeholder('float', [None, xtrain.shape[1]])

    mse = tf.reduce_mean(tf.square(outputLayer - outputValue))

    lr = 0.1 
    optimizer = tf.train.AdagradOptimizer(lr).minimize(mse)

    init = tf.global_variables_initializer()
    
    sess.run(init)

    batchSize = 100 
    numEpochs = 1
    totalUsers = xtrain.shape[0]


    for epochs in range(numEpochs):
        epochLoss = 0 
        for i in range(int(totalUsers/batchSize)): 
            epoch_x = xtrain[i*batchSize:(i+1)*batchSize]
            _, c = sess.run([optimizer, mse], feed_dict={inputLayer: epoch_x, outputValue: epoch_x})
            epochLoss += c 

        output_train = sess.run(outputLayer, feed_dict={inputLayer:xtrain})
        output_test = sess.run(outputLayer, feed_dict={inputLayer:xtest})

    return xtrain, inputLayer, outputLayer

def test(user_recc,xtrain, inputLayer, outputLayer): 
    '''
    '''
    global sess
    user_recc = user_recc.split(",")
    user_recc = np.asarray(user_recc, dtype=np.float32)
    padding = np.zeros(xtrain.shape[1]-len(user_recc))
    user_recc = np.concatenate((user_recc, padding), axis=0)

    predict = sess.run(outputLayer, feed_dict={inputLayer:[user_recc]})

    count = 0 
    predictTuple = []

    for i in range(len(predict[0])): 
        if count == 20:
            break 
        predictTuple.append([i, predict[0][i]])
        count += 1 


    predictTuple = sorted(predictTuple, key = lambda x: float(x[1]), reverse=True)[:6]

    return predictTuple

if __name__ == "__main__":
    import sys

    user_recc = sys.argv[1]

    ratings_pivot = preprocess()

    xtrain, inputLayer, outputLayer = training(ratings_pivot)

    predictions = test(user_recc, xtrain,inputLayer,outputLayer)
    print(predictions)

    sys.stdout.flush()
    