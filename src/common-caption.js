FusionCharts.register('module', ['private', 'modules.renderer.js-extension-caption',
    function() {

        var global = this,
            lib = global.hcLib,
            parseUnsafeString = lib.parseUnsafeString,
            chartAPI = lib.chartAPI;

        chartAPI('caption', {
            standaloneInit: true,
            friendlyName: 'caption'
        }, chartAPI.drawingpad);

        FusionCharts.register('component', ['extension', 'caption', {
            type: 'drawingpad',

            inhereitBaseExtension: true,

            init: function(chart) {
                var extension = this;
                extension.chart = chart;
            },
            draw: function() {
                var extension = this,
                    iapi = extension.chart,
                    Caption = FusionCharts.register('COMPONENT', ['CAPTION', 'CAPTION']),
                    components = iapi.components || (iapi.components = {});
                components.caption || (components.caption = new Caption());
                components.caption.init();
                components.caption.chart = iapi;
                iapi._manageCaptionPosition ();
                components.caption && components.caption.draw();
            }
        }]);
    }
]);
