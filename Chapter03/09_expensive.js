

function compute_intersection(arr1, arr2) {
    var results = [];
    for (var i = 0 ; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr2[j] == arr1[i]) {
                results[results.length] = arr2[j];
                break;
            }
        }
    }
}

