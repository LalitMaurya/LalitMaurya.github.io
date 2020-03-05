var isMobile = !1;
(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) && (isMobile = !0), window.innerWidth <= 480 && (isMobile = !0);
var type = "SC",
    match_property = "cartodb_id",
    value_property = type + "_pct_cultivators",
    colors = ["#fecc5c", "#feedde", "#fdbe85", "#fd8d3c", "#e6550d", "#a63603"],
    limits = [0, 1, 2, 3, 4, 5],
    width = window.innerWidth,
    height = 650,
    projection = d3.geoMercator(),
    path = d3.geoPath().projection(projection).pointRadius(2),
    svg = d3.select("#map").append("svg").attr("width", width).attr("height", height),
    annotations = [{
        st_nm: "Rajasthan",
        title: "Rajasthan",
        label: {
            SC: "this is a hindi test"
        },
        mobile_show: !0
    }, {
        st_nm: "Kerala",
        title: "Kerala",
        label: {
            SC: "In each of Kerela's 14 districts, at least 84% of Dalit farmers are wage labourers. In one district, Palakkad, more than 97% work for wages."
        },
        mobile_show: !0
    }, {
        st_nm: "Himachal Pradesh",
        title: "Northern states",
        label: {
            SC: "In Himachal Pradesh, Uttarakhand, and J&K, Dalit farmers are unlikely to work as wage labourers."
        },
        mobile_show: !1
    }, {
        st_nm: "Assam",
        title: "Northeast",
        label: {
            SC: "In the traditionally tribal states of the northeast, many Dalit farmers are cultivators."
        },
        mobile_show: !1
    }],
    annotations_generator = d3.annotation().type(d3.annotationCalloutElbow),
    t_margin = {
        top: 14,
        left: 0,
        bottom: 0,
        right: 0
    },
    t_width = (isMobile ? window.innerWidth - 20 : 200) - t_margin.left - t_margin.right,
    t_height = 80 - t_margin.top - t_margin.bottom,
    t_svg = d3.select("#tip").append("svg").attr("class", "tip-chart").attr("width", t_width + t_margin.left + t_margin.right).attr("height", t_height + t_margin.top + t_margin.bottom).append("g").attr("transform", "translate(" + t_margin.left + ", " + t_margin.top + ")"),
    t_x = {
        SC: d3.scaleLinear().range([0, t_width]),
        GEN: d3.scaleLinear().range([0, t_width])
    },
    t_y = d3.scaleBand().rangeRound([0, t_height]).domain(["SC", "GEN"]).paddingInner(.45),
    l_margin = {
        top: 16,
        left: 0,
        bottom: 0,
        right: 0
    },
    l_width = +jz.str.keepNumber(d3.select("#legend").style("width")) - l_margin.left - l_margin.right,
    l_height = 33 - l_margin.top - l_margin.bottom,
    l_svg = d3.select("#legend").append("svg").attr("class", "legend-chart").attr("width", l_width + l_margin.left + l_margin.right).attr("height", l_height + l_margin.top + l_margin.bottom).append("g").attr("transform", "translate(" + l_margin.left + ", " + l_margin.top + ")"),
    colors_reversed = ["#a63603", "#e6550d", "#fd8d3c", "#fdbe85", "#feedde", "#fecc5c"].reverse(),
    l_x = d3.scaleBand().rangeRound([0, l_width]).domain(colors_reversed).paddingInner(.01);

function ready(t, e, a, r) {
    var n, i, o = [];
    ["SC", "GEN"].forEach(function(t) {
        [t + "_agricultural_labourers", t + "_cultivators", t + "_total_farmers", t + "_pct_cultivators"].forEach(function(t) {
            o.push(t)
        })
    }), jz.arr.propertyToNumber(r, o), p(a, width, height), h(e, "district", match_property), n = a, i = topojson.mesh(n, n.objects.polygons, function(t, e) {
        return t === e
    }), svg.append("path").datum(i).attr("d", path).attr("class", "subunit-boundary"), d(r, "district"), h(a, "state", "st_nm"), u(r, "district", isMobile, t_width, t_svg, t_x, width), window.addEventListener("resize", function() {
        isMobile = window.innerWidth <= 480;
        var t = window.innerWidth;
        svg.attr("width", t).attr("height", 650), p(a, t, 650), svg.selectAll("path").attr("d", path), t_width = (isMobile ? window.innerWidth - 20 : 200) - t_margin.left - t_margin.right, t_svg.attr("width", t_width + t_margin.left + t_margin.right), t_x.SC.range([0, t_width]), t_x.GEN.range([0, t_width]), u(r, "district", isMobile, t_width, t_svg, t_x, t), d3.timeout(function() {
            var e = c(isMobile, t, svg, type);
            annotations_generator.annotations(e), d3.select(".annotation-group").call(annotations_generator).moveToFront()
        }, 10), l_width = (window.innerWidth <= 500 ? window.innerWidth - 60 : +jz.str.keepNumber(d3.select("#legend").style("width"))) - l_margin.left - l_margin.right, console.log(l_width), d3.select("#legend svg").attr("width", l_width + l_margin.left + l_margin.right), l_x.rangeRound([0, l_width]), l_svg.selectAll("rect").attr("x", function(t) {
            return l_x(t)
        }).attr("width", l_x.bandwidth()), l_svg.selectAll(".legend-label").attr("x", function(t, e) {
            return 0 == e ? 0 : l_width
        })
    });
    var l = c(isMobile, width, svg, type);
    annotations_generator.annotations(l), svg.append("g").attr("class", "annotation-group").call(annotations_generator);
    var s = d3.selectAll(".toggle-item");

    function d(t, e) {
        svg.selectAll(".subunit." + e).transition().style("fill", function(e, a) {
            var r = g(e, t);
            if (r) {
                var n = [];
                return limits.forEach(function(t, e) {
                    +r[value_property] >= t && +r[value_property] <= limits[e + 1] && n.push(colors[e])
                }), n[0]
            }
        })
    }

    function c(t, e, a, r) {
        return annotations.filter(function(e) {
            return t ? e.mobile_show : e
        }).map(function(e) {
            var n = {
                    note: {
                        title: e.title,
                        label: e.label[r]
                    }
                },
                i = a.select(".state-" + jz.str.toSlugCase(e.st_nm)).node().getBBox(),
                o = a.node().getBBox();
            n.x = i.x + i.width / 2, n.y = i.y + i.height / 2;
            var l = o.width + o.x - n.x - (t ? 150 : 200);
            return n.dx = "Kerala" == e.st_nm ? t ? l : -100 : "Rajasthan" == e.st_nm ? t ? l : -65 : "Himachal Pradesh" == e.st_nm ? 150 : "Assam" == e.st_nm ? 30 : 0, n.dy = "Rajasthan" == e.st_nm ? t ? -125 : -100 : "Kerala" == e.st_nm ? t ? 0 : -50 : "Himachal Pradesh" == e.st_nm ? -1 : "Assam" == e.st_nm ? 60 : 0, n
        })
    }

    function u(t, e, a, r, n, i, o) {
        d3.select("#tip").on("click", function() {
            d3.select("#tip").style("display", "none"), d3.selectAll(".subunit").classed("selected", !1), d3.select(".subunit-boundary").moveToFront()
        }), svg.selectAll(".subunit." + e).on("mouseover", function(a) {
            d3.select("#tip").style("display", "block");
            var o = g(a, t);
            o || d3.select("#tip").style("display", "none"), d3.select("#tip .tip-title").html(o.district_name + ", " + o.state_name), i.SC.domain([0, o.SC_total_farmers]), i.GEN.domain([0, o.GEN_total_farmers]);
            var l = [{
                type: "SC",
                ag_cult: "Ag. Labour",
                value: o.SC_agricultural_labourers
            }, {
                type: "SC",
                ag_cult: "Cultivator",
                value: o.SC_cultivators
            }, {
                type: "GEN",
                ag_cult: "Ag. Labour",
                value: o.GEN_agricultural_labourers
            }, {
                type: "GEN",
                ag_cult: "Cultivator",
                value: o.GEN_cultivators
            }];
            l.forEach(function(t) {
                return t.x = "Cultivator" == t.ag_cult ? 0 : i[t.type](l.filter(function(e) {
                    return e.type == t.type && "Cultivator" == e.ag_cult
                })[0].value), t.y = t_y(t.type), t.width = i[t.type](t.value), t.height = t_y.bandwidth(), t.fill = "Cultivator" == t.ag_cult ? colors[colors.length - 2] : colors[1], t
            });
            var s = n.selectAll("rect").data(l, function(t, e) {
                return e
            });
            s.enter().append("rect").style("fill", function(t) {
                return t.fill
            }).attr("y", function(t) {
                return t.y
            }).attr("height", function(t) {
                return t.height
            }).merge(s).attr("width", function(t) {
                return t.width
            }).attr("x", function(t) {
                return t.x
            });
            var d = [{
                    type: "SC",
                    show: !o.SC_cultivators && !o.SC_agricultural_labourers
                }, {
                    type: "GEN",
                    show: !o.GEN_cultivators && !o.GEN_agricultural_labourers
                }],
                c = n.selectAll(".no-show-label").data(d, function(t, e) {
                    return e
                });
            c.enter().append("text").attr("class", "no-show-label").attr("x", 0).attr("y", function(t) {
                return t_y(t.type) + t_y.bandwidth() / 2
            }).attr("dy", 4).merge(c).text(function(t) {
                return t.show ? "No data" : ""
            });
            var u = n.selectAll(".bar-label").data(l, function(t, e) {
                return e
            });
            u.enter().append("text").attr("class", "bar-label").attr("x", function(t) {
                return "Cultivator" == t.ag_cult ? 0 : r
            }).attr("dx", function(t) {
                return "Cultivator" == t.ag_cult ? 4 : -4
            }).attr("y", function(t) {
                return t.y + t_y.bandwidth() / 2
            }).attr("dy", 4.5).style("text-anchor", function(t) {
                return "Cultivator" == t.ag_cult ? "start" : "end"
            }).merge(u).text(function(t) {
                return t.width < 34 ? "" : (t.value / o[t.type + "_total_farmers"] * 100).toFixed(1) + "%"
            });
            var p = n.selectAll(".type-label").data([{
                type: "SC",
                label: "Climate Vulnerability"
            }, {
                type: "GEN",
                label: "Water Risk"
            }]);
            p.enter().append("text").attr("class", "type-label").attr("y", function(t) {
                return t_y(t.type)
            }).attr("dy", -3).merge(p).html(function(t) {
                return t.label + "<tspan>" + jz.str.numberLakhs(o[t.type + "_total_farmers"]) + " Vulnerability Indices</tspan>"
            }), d3.selectAll(".type-label tspan").attr("dx", 4), d3.select(".subunit." + e + "." + e + "-" + jz.str.toSlugCase(a.properties[match_property])).classed("selected", !0).moveToFront(), d3.selectAll(".subunit.state").moveToFront()
        }).on("mousemove", function() {
            d3.select(".annotation-group").moveToFront();
            var t, e = (t = d3.mouse(this))[0],
                r = t[1],
                n = d3.select("#map").node().getBoundingClientRect(),
                i = n.top,
                o = -1 !== navigator.userAgent.toLowerCase().indexOf("safari") && -1 == navigator.userAgent.toLowerCase().indexOf("chrome") ? document.body.scrollTop : document.documentElement.scrollTop,
                l = +jz.str.keepNumber(d3.select("#tip").style("height"));
            n.height, window.innerHeight;
            d3.select("#tip").style("left", a ? "0px" : e + 20 + "px").style("top", a ? r - 20 + i + o - l - 5 + "px" : r - 20 + i + o + "px")
        }).on("mouseout", function() {
            d3.select("#tip").style("display", "none"), d3.selectAll(".subunit").classed("selected", !1), d3.select(".subunit-boundary").moveToFront()
        })
    }

    function g(t, e) {
        return e.filter(function(e) {
            return t.properties[match_property] == +e[match_property]
        })[0]
    }

    function p(t, e, a) {
        projection.fitExtent([
            [0, 0],
            [e, a]
        ], topojson.feature(t, t.objects.polygons))
    }

    function h(t, e, a) {
        svg.selectAll(".subunit." + e).data(topojson.feature(t, t.objects.polygons).features).enter().append("path").attr("class", function(t) {
            return "subunit " + e + " " + e + "-" + jz.str.toSlugCase(t.properties[a])
        }).attr("d", path)
    }
    s.on("click", function() {
        var t = d3.select(this);
        s.classed("active", !1), t.classed("active", !0), type = t.attr("toggle-value"), value_property = type + "_pct_cultivators", d(r, "district"), u(r, "district", isMobile, t_width, t_svg, t_x, width)
    })
}
l_svg.selectAll("rect").data(colors_reversed).enter().append("rect").attr("x", function(t) {
    return l_x(t)
}).attr("width", l_x.bandwidth()).attr("height", l_height).style("fill", function(t) {
    return t
}), l_svg.selectAll(".legend-label").data(window.innerWidth < 400 ? ["? Cultivators", "Agricultural labourers ?"] : [" Less climate vulnerable", "More climate vulnerable"]).enter().append("text").attr("class", "legend-label").attr("x", function(t, e) {
    return 0 == e ? 0 : l_width
}).attr("dy", -5).style("text-anchor", function(t, e) {
    return 0 == e ? "start" : "end"
}).text(function(t) {
    return t
}), d3.queue().defer(d3.json, "data/india.json").defer(d3.json, "data/india.json").defer(d3.csv, "data/master1.csv").await(ready);// JavaScript Document