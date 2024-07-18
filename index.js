// timer
function loading() {
    const element = document.getElementById("loading");
    return {
        remove: function () {
            element.remove();
        },
        hide: function () {
            setTimeout(() => {
                element.classList.add("hide");
            }, 500);
        }
    }
}
function timer() {
    let time = 0
    let interval;
    return {
        start: function (write) {
            write.innerHTML = time.toString();
            interval = setInterval(() => {
                time++
                write.innerHTML = time.toString();
            }, 1000);
        },
        stop: function () {
            clearInterval(interval);
        },
        reset: function (write) {
            time = 0;
            write.innerHTML = time;
        },
        time: function () {
            return time;
        }
    }
}
function status(stat) {
    const info = document.querySelectorAll(".status-info");
    const readable = stat ? "stopped" : "time is ticking...";
    info.forEach(item => {
        item.innerHTML = `${readable}`;
    })
}
document.addEventListener("DOMContentLoaded", () => {
    loading().hide();
    let isStopped = true;
    const stopwatch = timer();
    const startTimer = document.getElementById("start");
    const stopTimer = document.getElementById("stop");
    const resetTimer = document.getElementById("reset");
    const result = document.getElementById("result");

    startTimer.addEventListener("click", () => { location.href = "#output"; startTimer.className = "time-is-ticking"; startTimer.innerHTML = "Time is Ticking..."; stopTimer.classList.add("show"); stopwatch.start(result); isStopped = false; status(false); })
    stopTimer.addEventListener("click", () => {
        stopwatch.stop()
        stopTimer.classList.remove("show");
        startTimer.className = "continue";
        startTimer.innerHTML = "Continue";
        isStopped = true;
        status(true);
    });
    resetTimer.addEventListener("click", () => {
        location.href = "#output";
        stopwatch.stop();
        stopTimer.classList.remove("show");
        stopwatch.reset(result);
        startTimer.className = "start";
        startTimer.innerHTML = "Start Stopwatch";
        isStopped = true;
        status(true);
    })
    result.addEventListener("click", () => {
        if (isStopped) {
            startTimer.className = "time-is-ticking";
            startTimer.innerHTML = "Time is Ticking...";
            stopTimer.classList.add("show");
            stopwatch.start(result);
            isStopped = false;
            status(false);
        } else {
            stopwatch.stop();
            stopTimer.classList.remove("show");
            startTimer.className = "continue";
            startTimer.innerHTML = "Continue";
            isStopped = true;
            status(true);
        }
    })
})