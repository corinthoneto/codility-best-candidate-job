'use strict';

const express = require('express');
const app = express();
app.use(express.json());

// Your code starts here. Placeholders for .get and .post are provided for
//  your convenience.

var candidates = []

function findCommonElement(array1, array2) {

  let occocount = 0;
      
    // Loop for array1
    for(let i = 0; i < array1.length; i++) {
          
        // Loop for array2
        for(let j = 0; j < array2.length; j++) {
              
            // Compare the element of each and
            // every element from both of the
            // arrays
            if(array1[i] === array2[j]) {
              
                // Return if common element found
                occocount++;
            }
        }
    }
      
    // Return if no common element exist
    return occocount; 
}

app.post('/candidates', function(req, res) {
  candidates.push(req.body);
  return res.status(200).send(req.body);
});

app.get('/candidates/search', function(req, res) {
  const { skills } = req.query;
  let tmpArrSkills = skills.split(",");
  
  let highest = 0;
  let bestCandidate = {};
  for (let i = 0; i < candidates.length; i++) {

      const found = tmpArrSkills.some(r=> candidates[i].skills.indexOf(r) >= 0);
      
      if(found){
        let totalOccur = findCommonElement(tmpArrSkills, candidates[i].skills);
        if(totalOccur > highest){
          highest = totalOccur;
          bestCandidate = candidates[i];
        }
      }
  }

  if(highest > 0){
    return res.status(200).send(bestCandidate);
  }else{
    return res.status(404).send();
  }
  
});

app.listen(process.env.HTTP_PORT || 3000);
