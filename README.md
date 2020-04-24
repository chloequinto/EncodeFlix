# EncodeFlix
Basically Netflix but with Deep Autoencoders. 

### Introduction 
EncodeFlix was developed in order to understand how machine learning models can be intergrated with a full stack web app. And to futher enforce an understanding of Autoencoders and other Collaborative Filtering ML models. 

This web app generates a view of several movies that the user can rate 1-5. After logout, the app spawns a python script to generate the most highly recommended  movies for the user. When the user logs back in, the home page will have the most recommended movies from the model. 

### Requirements 
To set up EncodeFlix on your server, you will need Python3 and NodeJS. In addition, you should have installed NPM and PIP for installing necessary libraries 

### Installation 
EncodeFlix utilizes the [MovieLens dataset](https://grouplens.org/datasets/movielens/). Download a small dataset to replicate. 

Once downloaded, extract the ml-1m folder within the data folder of this repo. 

Once all the above requirements are met, 

Seed Mongo Database 
```terminal 
cd data
node run seed
cd .. # go back to root
```

Start database
```terminal
mongod #startup database
npm install # install necessary libraries
npm start  # start app 
```



### Future Work 
A couple ideas to extend this project: 
* ***Accuracy*** - it's difficult to measure the accuracy of a recommendation system in comparison to other ML models since there are no explicit method of telling whether the recommendations are precise or not. Currently, the only metrics genereated is ***MSE***. In the future, implementing methods to calculate the ***precision, recall and even user feedback*** would be interesting. 

* At some point, the autoencoder will ***converge*** to a specific number of recommended movies. If the user wishes to see more movies, generate additional movies within the home page
