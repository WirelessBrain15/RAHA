
var timeout, interval;

let x = 0;
let y = 0;

var button = document.getElementById();

button.addEventListener('mousedown', function()
{
    incrementValue(x);

    timeout = setTimeout(function()
    {
        interval = setInterval(function()
        {
            incrementValue(x);
        }, 50);
    }, 300);
});

button.addEventListener('mouseup', clearTimers);
button.addEventListener('mouseleave', clearTimers);

function clearTimers()
{
    clearTimeout(timeout);
    clearInterval(interval);
}

function incrementValue(id)
{
    id ++;
    console.log(x);
}