// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  /*
  Pseudo Code!
  1. Load all nodes of the DOM into function. - document.body
  2. Iterate through all the child nodes. For loop.  document.body.childNodes is basically like an array.
  3. Test all the child nodes.
  4. Feed the passed child nodes back to results, and return the function
  */
  //Place to store results
  var result = [];
  var classRecursive = function (node) {
    //If class list is available. Then execute.
    if (node.classList) {
      //Test using the helper function using the class list and the className target.
      if (test(node.classList, className)) {
        //If successful push away!
        result.push(node);
      }
    }
    // if document.body nodes are great than 0 - true
    if (node.childNodes.length > 0) {
      //iterate through each one of them and feed them back into the recursive function
      // this is great since it separates everything.
      for (var i = 0; i < node.childNodes.length; i++) {
        //Feeds the document.body nodes into small bits
        classRecursive(node.childNodes[i]);
      }
    }
  }
  //Feeds document.body into the recursive class.
  classRecursive(document.body);
  return result;
}

//Test if the node is in the classList
var test = function(collection, target) {
  var current = false;
  for(var i=0; i<collection.length; i++) {
    if(target === collection[i]) {
      current = true;;
    }
  }
  return current;
};