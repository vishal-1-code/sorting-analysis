// Function to generate a new random array


function generateArray() {
    const arrayContainer = document.getElementById('arrayContainer');
    arrayContainer.innerHTML = '';

    const array = [];
    const arraySize = 12; // Size of the array

    for (let i = 0; i < arraySize; i++) {
        array[i] = Math.floor(Math.random() * 100) + 1; // Random values between 1 and 100
    }

    for (let i = 0; i < arraySize; i++) {
        const arrayElement = document.createElement('div');
        arrayElement.style.height = `${array[i] * 3}px`;
        arrayElement.classList.add('array-bar');
        arrayContainer.appendChild(arrayElement);
    }
}

// Helper function to wait for delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
    const arrayBars = document.querySelectorAll('.array-bar');
    const array = Array.from(arrayBars);

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            array[j].style.backgroundColor = '#FF4949';
            array[j + 1].style.backgroundColor = '#FF4949';

            await sleep(100);

            if (parseInt(array[j].style.height) > parseInt(array[j + 1].style.height)) {
                // Swap heights
                let temp = array[j].style.height;
                array[j].style.height = array[j + 1].style.height;
                array[j + 1].style.height = temp;
            }

            array[j].style.backgroundColor = '#6b5b95';
            array[j + 1].style.backgroundColor = '#6b5b95';
        }
        array[array.length - i - 1].style.backgroundColor = '#13CE66';
    }
}

// Selection Sort
async function selectionSort() {
    const arrayBars = document.querySelectorAll('.array-bar');
    const array = Array.from(arrayBars);

    for (let i = 0; i < array.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            array[j].style.backgroundColor = '#FF4949';
            await sleep(100);

            if (parseInt(array[j].style.height) < parseInt(array[minIndex].style.height)) {
                if (minIndex !== i) {
                    array[minIndex].style.backgroundColor = '#6b5b95';
                }
                minIndex = j;
            } else {
                array[j].style.backgroundColor = '#6b5b95';
            }
        }

        let temp = array[minIndex].style.height;
        array[minIndex].style.height = array[i].style.height;
        array[i].style.height = temp;

        array[minIndex].style.backgroundColor = '#6b5b95';
        array[array.length - i - 1].style.backgroundColor = '#13CE66';
    }
}

// Insertion Sort
async function insertionSort() {
    const arrayBars = document.querySelectorAll('.array-bar');
    const array = Array.from(arrayBars);

    for (let i = 1; i < array.length; i++) {
        let key = parseInt(array[i].style.height);
        let j = i - 1;

        array[i].style.backgroundColor = '#FF4949';

        await sleep(100);

        while (j >= 0 && parseInt(array[j].style.height) > key) {
            array[j].style.backgroundColor = '#FF4949';
            array[j + 1].style.height = array[j].style.height;
            j--;
            await sleep(100);
            for (let k = 0; k < i; k++) {
                array[k].style.backgroundColor = '#6b5b95';
            }
        }
        array[j + 1].style.height = `${key}px`;
        array[i].style.backgroundColor = '#6b5b95';
    }
}


// Merge Sort
async function mergeSort() {
    const arrayBars = document.querySelectorAll('.array-bar');
    const array = Array.from(arrayBars);

    async function merge(low, mid, high) {
        let left = array.slice(low, mid + 1);
        let right = array.slice(mid + 1, high + 1);

        let i = 0, j = 0, k = low;

        while (i < left.length && j < right.length) {
            if (parseInt(left[i].style.height) <= parseInt(right[j].style.height)) {
                array[k++] = left[i++];
            } else {
                array[k++] = right[j++];
            }
        }

        while (i < left.length) {
            array[k++] = left[i++];
        }

        while (j < right.length) {
            array[k++] = right[j++];
        }

        // Visualize merge
        for (let idx = low; idx <= high; idx++) {
            await sleep(100);
            arrayBars[idx].style.height = `${parseInt(array[idx].style.height)}px`;
        }
    }

    async function mergeSortHelper(low, high) {
        if (low < high) {
            let mid = Math.floor((low + high) / 2);
            await mergeSortHelper(low, mid);
            await mergeSortHelper(mid + 1, high);
            await merge(low, mid, high);
        }
    }

    await mergeSortHelper(0, array.length - 1);
}
// Quick Sort
async function quickSort() {
    const arrayBars = document.querySelectorAll('.array-bar');
    const array = Array.from(arrayBars);

    async function partition(low, high) {
        let pivot = parseInt(array[high].style.height);
        let i = low - 1;

        for (let j = low; j < high; j++) {
            array[j].style.backgroundColor = '#FF4949';
            await sleep(100);

            if (parseInt(array[j].style.height) < pivot) {
                i++;
                let temp = array[i].style.height;
                array[i].style.height = array[j].style.height;
                array[j].style.height = temp;
            }

            array[j].style.backgroundColor = '#6b5b95';
        }

        let temp = array[i + 1].style.height;
        array[i + 1].style.height = array[high].style.height;
        array[high].style.height = temp;

        return i + 1;
    }

    async function quickSortHelper(low, high) {
        if (low < high) {
            let pi = await partition(low, high);

            await quickSortHelper(low, pi - 1);
            await quickSortHelper(pi + 1, high);
        }
    }

    await quickSortHelper(0, array.length - 1);
}

