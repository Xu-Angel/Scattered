#! /bin/bash
# testing the exit status of a function
#

function func1 {
        echo "This is the first form of defining a function:"
        ls -l badfile   # badfile is not exist
}

func2() {
        echo "This is the second form of defining a function:"
        date            #
}

echo "Testing the function and exit status"
echo
func1
echo "The exit status of func1 is: $?"
echo
func2
echo "The exit status of func2 is: $?"
