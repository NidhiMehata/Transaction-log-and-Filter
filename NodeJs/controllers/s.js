db.movies.aggregate([ { $match : { $and : [ { "imdb.rating" : { $gte : 6} },
                                          {genre : { $ne : { $and : ["Crime", "Horror"]} }} ,
                                          {rated : { $in : ["PG", "G"]}},
                                          {languages : { $and : ["English", "Japanese"]} }
                                        ]   }}]).pretty()