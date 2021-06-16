Sorting algorithms are very important to know and implement. Toady I want to go over one of the most popular sorting algorithm called [merge sort](https://en.wikipedia.org/wiki/Merge_sort) implemented in JavaScript.

### What is merge sort ?

Merge sort is one of the most popular sorting algorithms today and it uses the concept of divide and conquer to sort a list of elements. i.e it divides the bigger problem into smaller sub problems and then solve such problems.

Basicallly behind the scenes it divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).

## Implementation

Now that we talked briefly about merge sort, let’s get right into the implementation of the merge sort.

Okay, Before we get straight into writing code let's first indetify the problem, plan and come up with a javascript solution.

**_Let’s take an example array [8,3,5,4,7,6,1,2] ⇒ Unsorted array and we want to sort this array using merge sort in an ascending order._**

Merge sort requires dividing the problem [(visualization)](https://visualgo.net/en/sorting) into smaller problems. So let’s look at a diagram of how this will look like 🧐

![Image-merge-sort](https://res.cloudinary.com/dqxwlfqrs/image/upload/v1617702311/jasbirrajrana-blog/merge-sort_u4lacj.png)

Notice that each level we divide the array into two halves until we get bunch of single element arrays this is the divide portion of our divide and conquer method .Then, we start merging and sorting the smaller arrays in a series of steps which is the conquer portion of divide and conquer.

## Code

_recursive function divide logic_

```javascript
function mergeSort(unsortedArray) {
  if (unsortedArray.length <= 1) return unsortedArray;

  let middle = Math.floor(unsortedArray.length / 2);
  let left = mergeSort(unsortedArray.slice(0, middle));
  let right = mergeSort(unsortedArray.slice(middle));

  return merge(left, right);
}
```

The code above will be our main or driver function that will divide the given array into smaller arrays in every iteration of the recursive call.
The code above will be our main or driver function that will divide the given array into smaller arrays in every iteration of the recursive call.

```javascript
if (unsortedArray.length <= 1) return unsortedArray;
```

After we done with our divide logic, Now we have to merge and sort our left and right

```javascript
function merge(left, right) {
  let resultArray = new Array();
  let leftIdx = 0;
  let rightIdx = 0;

  while (leftIdx < left.length && rightIdx < right.length) {
    if (right[rightIdx] > left[leftIdx]) {
      resultArray.push(left[leftIdx]);
      leftIdx++;
    } else {
      resultArray.push(right[rightIdx]);
      rightIdx++;
    }
  }

  while (leftIdx < left.length) {
    resultArray.push(left[leftIdx]);
    leftIdx++;
  }

  while (rightIdx < right.length) {
    resultArray.push(right[rightIdx]);
    rightIdx++;
  }
  return resultArray;
}
```

In the merge function above we need to make sure we are sorting all the elements in the left and the right arrays. In addition, we will need to make sure we keep track of which element from each left and right we are comparing by using the variables leftIndex and rightIndex.

Within the while loop, we compare element in the left at leftIndex and element in the right at rightIndex. We can push the smaller of the two into our result array and move our cursor (leftIndex/rightIndex) to make sure we aren’t duplicating any comparisons.

> _This is very important!_ 🙌

```javascript
while (leftIdx < left.length) {
  resultArray.push(left[leftIdx]);
  leftIdx++;
}

while (rightIdx < right.length) {
  resultArray.push(right[rightIdx]);
  rightIdx++;
}
```

If we don't do this at the end of our merge function at the last we will have an incomplete list of elements because what happened our first while loop will end when we hit the end of our shorter array because the while loop condition will fail once any one of the two cursors reach the end meaning the last element in either left or the right isn’t inserted into the result array.

**_I hope you enjoy it and learn something from it_**🤓
