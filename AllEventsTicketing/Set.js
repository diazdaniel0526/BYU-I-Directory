function Set() {

    this.intersection = function (listA, listB) {

        var resultList = []; // this creates an empty resultList array

        if (listA === null || listB === null) { // this check for invalid inputs
            return null; // is statement is true, then this will return null to indicate an error
        }

        for (var i = 0; i < listA.length; i++) { // this loop goes through every element in listA
            var nextValue = listA[i]; // this grabs the next value in the list

            // this goes through the listB elements
            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) { // this listB element equals nextValue value
                    resultList.push(listB[j]); // this add the listB element to the end of the resultList
                    break; // this exits the listB loop
                }
            }
        }

        return resultList;
    }

    this.union = function (listA, listB) {
        // var inter = this.intersection(listA, listB)
        // var sim = this.symmetricDifference(listA, listB)

        var resultList = [];

        if (listA === null || listB === null) { // this check for invalid inputs
            return null; // is statement is true, then this will return null to indicate an error
        }

        for (var i = 0; i < listA.length; i++) { // this loop goes through every element in listA
            var nextValue = listA[i]; // this grabs the next value in the list
            var found = false;

            // this goes through the listB elements
            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) { // this listB element equals nextValue value
                    found = true;
                    break; // this exits the listB loop
                }
            }
            if (!found) {
                resultList.push(nextValue); // this add the listB element to the end of the resultList
            }
        }

        for (var k = 0; k < listB.length; k++) { // this loop goes through every element in listA
            var nextValueB = listB[k]; // this grabs the next value in the list
            var foundB = false;

            // this goes through the listB elements
            for (var m = 0; m < listA.length; m++) {
                if (listA[m] === nextValueB) { // this listB element equals nextValue value
                    foundB = true;
                    break; // this exits the listB loop
                }
            }
            if (!foundB) {
                resultList.push(nextValueB); // this add the listB element to the end of the resultList
            }
        }

        for (var o = 0; o < listA.length; o++) { // this loop goes through every element in listA
            var nextValueAB = listA[o]; // this grabs the next value in the list

            // this goes through the listB elements
            for (var p = 0; p < listB.length; p++) {
                if (listB[p] === nextValueAB) { // this listB element equals nextValue value
                    resultList.push(listB[p]); // this add the listB element to the end of the resultList
                    break; // this exits the listB loop
                }
            }
        }
        return resultList;
    }

    this.relativeComplement = function (listA, listB) {

        var resultList = [];
        //  var resultListinter = new Array();
        // resultListinter = new intersection(listA, listB);
        var resultListinter = []; // this creates an empty resultList array

        if (listA === null || listB === null) { // this check for invalid inputs
            return null; // is statement is true, then this will return null to indicate an error
        }

        for (var i = 0; i < listA.length; i++) { // this loop goes through every element in listA
            var nextValue = listA[i]; // this grabs the next value in the list

            // this goes through the listB elements
            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) { // this listB element equals nextValue value
                    resultListinter.push(listB[j]); // this add the listB element to the end of the resultList
                    break; // this exits the listB loop
                }
            }
        }

        if (listA === null || listB === null) { // this check for invalid inputs
            return null; // is statement is true, then this will return null to indicate an error
        }

        for (var k = 0; k < listA.length; k++) { // this loop goes through every element in listA
            var nextValue1 = listA[k]; // this grabs the next value in the list
            var found = false;
            // this goes through the listB elements
            for (var l = 0; l < resultListinter.length; l++) {
                if (resultListinter[l] === nextValue1) { // this listB element equals nextValue value
                    found = true;
                    break; // this exits the listB loop
                }
            }
            if (found === false) {
                resultList.push(nextValue1); // this add the listB element to the end of the resultList
            }
        }

        return resultList;
    }

    this.symmetricDifference = function (listA, listB) {

        var resultList = [];

        if (listA === null || listB === null) { // this check for invalid inputs
            return null; // is statement is true, then this will return null to indicate an error
        }

        for (var i = 0; i < listA.length; i++) { // this loop goes through every element in listA
            var nextValue = listA[i]; // this grabs the next value in the list
            var found = false;

            // this goes through the listB elements
            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) { // this listB element equals nextValue value
                    found = true;
                    break; // this exits the listB loop
                }
            }
            if (!found) {
                resultList.push(nextValue); // this add the listB element to the end of the resultList
            }
        }

        for (var k = 0; k < listB.length; k++) { // this loop goes through every element in listA
            var nextValueB = listB[k]; // this grabs the next value in the list
            var foundB = false;

            // this goes through the listB elements
            for (var m = 0; m < listA.length; m++) {
                if (listA[m] === nextValueB) { // this listB element equals nextValue value
                    foundB = true;
                    break; // this exits the listB loop
                }
            }
            if (!foundB) {
                resultList.push(nextValueB); // this add the listB element to the end of the resultList
            }
        }


        return resultList;
    }

}
