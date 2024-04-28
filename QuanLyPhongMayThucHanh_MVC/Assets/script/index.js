$(function () {

    //BEGIN CALENDAR
    // $("#my-calendar").zabuto_calendar({
    //     language: "en"
    // });
    //END CALENDAR

    //BEGIN TO-DO-LIST
    // $('.todo-list').slimScroll({
    //     "width": '100%',
    //     "height": '250px',
    //     "wheelStep": 5
    // });
    $( ".sortable" ).sortable();
    $( ".sortable" ).disableSelection();
    //END TO-DO-LIST

    //BEGIN AREA CHART SPLINE
    var d6_1 = [["Jan", 67],["Feb", 91],["Mar", 36],["Apr", 150],["May", 28],["Jun", 123],["Jul", 38]];
    var d6_2 = [["Jan", 59],["Feb", 49],["Mar", 45],["Apr", 94],["May", 76],["Jun", 22],["Jul", 31]];
    $.plot("#area-chart-spline", [{
        data: d6_1,
        label: "Upload",
        color: "#66b0ea"
    },{
        data: d6_2,
        label: "Download",
        color: "#3f516b"
    }], {
        series: {
            lines: {
                show: !1
            },
            splines: {
                show: !0,
                tension: .4,
                lineWidth: 2,
                fill: .8
            },
            points: {
                show: !0,
                radius: 4
            }
        },
        grid: {
            borderColor: "#fafafa",
            borderWidth: 1,
            hoverable: !0
        },
        tooltip: !0,
        tooltipOpts: {
            content: "%x : %y",
            defaultTheme: true
        },
        xaxis: {
            tickColor: "#fafafa",
            mode: "categories"
        },
        yaxis: {
            tickColor: "#fafafa"
        },
        shadowSize: 0
    });
    //END AREA CHART SPLINE

    //BEGIN INTRO JS
   
    //END INTRO JS






    // function counterNum(obj, start, end, step, duration) {
    //     $(obj).html(start);
    //     setInterval(function(){
    //         var val = Number($(obj).html());
    //         if (val < end) {
    //             $(obj).html(val+step);
    //         } else {
    //             clearInterval();
    //         }
    //     },duration);
    // }
    //END COUNTER FOR SUMMARY BOX

});

