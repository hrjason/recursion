// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
/*
  Pseudo Code
  1. Create if/else statements to specify object, number, or whatever from fixtures.js. From there delegate tasks.
  2. Create an object and array convertor

  Notes:
  1. Remember that null, function, and undefined are also objects. 
*/
var stringifyJSON = function(obj) {
  return typeSelector(obj);
};

//Create function to select cases, if else statements are nice but switch boards are much easier on the eyes!
var typeSelector = function(input) {
  switch (typeof(input)) {
    case 'object' :
    //send to function to convert object
      return objConvertor(input);
    case 'number' :
     //numbers easily go to string
      return input.toString();
    case 'string' :
    //make sure to do the escape for the input strings.
      return '\"' + input + '\"';
    //boolean doesnt need anything special. 
    case 'boolean' : 
      return input.toString();
    default :
    //the input is a mutant
      console.log('None of the above');
  }
};

//Object Convertor
var objConvertor = function(obj) {
  //If the object is an array send to the array convertor below! 
  if(Array.isArray(obj)) {
    return arrConvertor(obj);
  //However the object is null, make the null into a string.  fixtures.js lists a few. 
  } else if (obj === null) {
    return 'null';
  } else {
    //Else do the dirty
    // Specify a starting holder. 
    var objectHolder = '{';
    //Object.getOwnPropertyNames() returns an array of all properties whose elements are strings. 
    //Kind of a nice little make shift for-var without the extra lines of code..
    //If Object has no properties, then just make into a '{}'.
    //Another way of doing the below Object.key()
    if(Object.getOwnPropertyNames(obj).length === 0){
      objectHolder += '}';
      return objectHolder;
    }
    //Iterate through the object for all of it's properties. 
    for(var prop in obj) {
      //if property is a function or undefined to return object strings.
      if(typeof obj[prop] === 'function') {
        return '{}';
      } else if (typeof obj[prop] === 'undefined') {
        return '{}';
      } else {
        // Add everything to the objectHolder = {
        //property 
        objectHolder += '"' + prop + '"';
        //colon
        objectHolder += ':';
        //expression - neat trick - use the typeSelector to restringify other values of the property.
        objectHolder += typeSelector(obj[prop]);
        //next obj. note the test for this is retarded
        objectHolder += ',';
      }
    }
    //add closing brace
    objectHolder = objectHolder.substring(0, objectHolder.length-1) + '}';
    return objectHolder;
  }
};

//Array Convertor
var arrConvertor = function(array) {
  //Starting Array Holder to set the string off. 
  var arrayHolder = '[';
  //If the array length is 0, close that bitch!
  if(array.length === 0) {
    arrayHolder += ']';
    return arrayHolder;
  //However if there is 1 item in there make it easier.
  } else if (array.length === 1) {
    arrayHolder += typeSelector(array[0]);
    arrayHolder += ']';
    return arrayHolder;
  //Add more shit
  } else {
    for (var i=0; i < array.length - 1; i++) {
      arrayHolder += typeSelector(array[i]);
      arrayHolder += ",";
    }
    //weird ass way of executing the end
    var last = array.pop();
    arrayHolder += typeSelector(last);
    arrayHolder += ']';
    return arrayHolder;
  }
};