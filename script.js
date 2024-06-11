document.addEventListener('DOMContentLoaded', function() {
    // Initialize chart
    var ctx = document.getElementById('chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Calories Burned vs Consumed',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Retrieve data from local storage
    var exercises = JSON.parse(localStorage.getItem('exercises')) || [];
    var meals = JSON.parse(localStorage.getItem('meals')) || [];

    // Update chart data
    updateChart();

    // Log exercise
    window.logExercise = function() {
        var exerciseName = document.getElementById('exerciseName').value;
        var exerciseDuration = parseInt(document.getElementById('exerciseDuration').value);
        var exerciseCalories = parseInt(document.getElementById('exerciseCalories').value);

        exercises.push({
            name: exerciseName,
            duration: exerciseDuration,
            calories: exerciseCalories
        });

        localStorage.setItem('exercises', JSON.stringify(exercises));
        updateChart();
    };

    // Log meal
    window.logMeal = function() {
        var mealName = document.getElementById('mealName').value;
        var mealCalories = parseInt(document.getElementById('mealCalories').value);

        meals.push({
            name: mealName,
            calories: mealCalories
        });

        localStorage.setItem('meals', JSON.stringify(meals));
        updateChart();
    };

    // Update chart with new data
    function updateChart() {
        var exerciseCalories = exercises.reduce((total, exercise) => total + exercise.calories, 0);
        var mealCalories = meals.reduce((total, meal) => total + meal.calories, 0);

        chart.data.labels = ['Exercise', 'Meal'];
        chart.data.datasets[0].data = [exerciseCalories, mealCalories];
        chart.update();
    }
});
