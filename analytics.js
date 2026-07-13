(function () {

    "use strict";



    /*
    =========================================
    Google Analytics Initialisation
    =========================================
    */


    window.dataLayer = window.dataLayer || [];


    function gtag() {

        dataLayer.push(arguments);

    }


    gtag('js', new Date());


    gtag('config', 'G-9VZK61L1DZ', {
        send_page_view: true
    });






    /*
    =========================================
    Consent Placeholder
    =========================================
    */


    function hasAnalyticsConsent() {

        // Replace later with cookie consent logic
        return true;

    }







    /*
    =========================================
    CTA Tracking
    =========================================
    */


    document.addEventListener("click", function (e) {


        const button = e.target.closest("[data-cta]");


        if (!button || !hasAnalyticsConsent()) {
            return;
        }



        gtag("event", "select_content", {


            content_type: "cta",

            item_id:
                button.dataset.cta,


            section:
                button.dataset.section || "unknown"


        });



    });








    /*
    =========================================
    Outbound Link Tracking
    =========================================
    */


    document.addEventListener("click", function (e) {


        const link = e.target.closest("a");


        if (!link || !link.href) {
            return;
        }



        try {


            const url = new URL(link.href);


            if (
                url.origin !== window.location.origin
                &&
                hasAnalyticsConsent()
            ) {


                gtag("event", "outbound_click", {


                    event_category: "outbound",

                    link_url: link.href


                });


            }



        }
        catch (err) { }



    });








    /*
    =========================================
    Downloads
    =========================================
    */


    document.addEventListener("click", function (e) {


        const link = e.target.closest("a");


        if (!link || !link.href || !hasAnalyticsConsent()) {
            return;
        }



        const href =
            link.href.toLowerCase();



        const downloadable = [

            ".exe",
            ".zip",
            ".pdf",
            ".msi",
            ".dmg",
            "download"

        ];



        if (
            downloadable.some(
                item => href.includes(item)
            )
        ) {


            gtag("event", "file_download", {


                file_name:
                    href.split("/").pop(),


                file_url:
                    link.href,


                transport_type: "beacon"


            });


        }



    });








    /*
    =========================================
    Share Button
    =========================================
    */

    document.addEventListener(
        "DOMContentLoaded",
        function () {


            const share = document.getElementById("shareButton");


            if (!share) {
                return;
            }


            share.addEventListener(
                "click",
                async function (e) {


                    e.preventDefault();


                    if (navigator.share) {


                        await navigator.share({

                            title: "ChessSpider",

                            text:
                                "Chess opening repertoire software for serious players.",

                            url:
                                "https://www.chessbites.com/"

                        });


                        if (hasAnalyticsConsent()) {

                            gtag(
                                "event",
                                "share",
                                {
                                    method: "native_share"
                                }
                            );

                        }


                    }
                    else {


                        alert(
                            "Sharing is not supported on this device."
                        );


                    }


                }
            );


        }
    );



    /*
    =========================================
    Scroll Depth Tracking
    =========================================
    */


    let firedMarks =
        new Set();



    const scrollMarks =
        [
            25,
            50,
            75,
            100
        ];



    let engaged =
        false;



    window.addEventListener(
        "scroll",
        function () {



            const scrollTop =
                window.scrollY;



            const height =
                document.documentElement.scrollHeight
                -
                window.innerHeight;



            if (height <= 0) {
                return;
            }



            const percentage =
                Math.round(
                    (scrollTop / height) * 100
                );





            if (
                !engaged
                &&
                scrollTop > 300
                &&
                hasAnalyticsConsent()
            ) {


                engaged = true;


                gtag(
                    "event",
                    "engaged_view",
                    {


                        method:
                            "scroll_300px"


                    });


            }







            scrollMarks.forEach(function (mark) {



                if (
                    percentage >= mark
                    &&
                    !firedMarks.has(mark)
                ) {


                    firedMarks.add(mark);



                    if (hasAnalyticsConsent()) {


                        gtag(
                            "event",
                            "scroll_depth",
                            {


                                percent_scrolled:
                                    mark


                            });


                    }



                }



            });



        },
        {
            passive: true
        }

    );



})();