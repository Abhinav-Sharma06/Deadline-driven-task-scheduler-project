const Task = require("../models/Task");

class BinaryHeap {
    constructor(compare) {
        this.heap = [];
        this.compare = compare;
    }

    insert(task) {
        this.heap.push(task);
        this.bubbleUp(this.heap.length - 1);
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) {
                break;
            }
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    heapify() {
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    heapifyDown(index) {
        let smallest = index;
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        
        if (leftChild < this.heap.length && this.compare(this.heap[leftChild], this.heap[smallest]) < 0) {
            smallest = leftChild;
        }
        if (rightChild < this.heap.length && this.compare(this.heap[rightChild], this.heap[smallest]) < 0) {
            smallest = rightChild;
        }
        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            this.heapifyDown(smallest);
        }
    }

    extractMin() {
        if (this.heap.length === 0) {
            return null;
        }
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.heapifyDown(0);
        }
        return min;
    }

	extractAll() {
		const sortedTasks = [];
		while (!this.isEmpty()) {
			sortedTasks.push(this.extractMin());
		}
		return sortedTasks;
	}
	
    isEmpty() {
        return this.heap.length === 0;
    }
}



exports.getTask = async (req, res) => {
    try {
        const taskData = await Task.find({});

        const binaryHeap = new BinaryHeap((task1, task2) => task1.deadline - task2.deadline);
        taskData.forEach(task => binaryHeap.insert(task));

        binaryHeap.heapify();

        
        const sortedTasks = binaryHeap.extractAll();
        res.json({ success: true, data: sortedTasks });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
