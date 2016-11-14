FusionCharts.register('module', ['private', 'modules.renderer.js-extension-caption',
    function() {

        var global = this,
            lib = global.hcLib,
            chartAPI = lib.chartAPI;

        chartAPI('caption', {
            standaloneInit: true,
            friendlyName: 'caption'
        }, chartAPI.drawingpad);

        FusionCharts.register('component', ['extension', 'caption', {
            type: 'drawingpad',

            inhereitBaseExtension: true,

            init: function(chart) {
                var extension = this,
                    iapi = extension.chart;
                extension.chart = chart;
            },
            draw: function() {
                var extension = this,
                    iapi = extension.chart,
                    config = iapi.config,
                    chartAttrs = iapi.jsonData.chart,
                    Caption = FusionCharts.register('component', ['caption', 'caption']),
                    components = iapi.components || (iapi.components = {}),
                    caption = components.caption,
                    subCaption = components.subCaption,
                    captionConfig = caption.config,
                    subCaptionConfig = subCaption.config;

                iapi._manageSpace();
                iapi._postSpaceManagement();

                caption || (caption = new Caption());
                caption.init();
                caption.chart = iapi;
                caption.configure();
                caption.manageSpace(config.height);
                captionConfig.drawCaption = true;
                caption.managePosition();
                caption && caption.draw();
            }
        }]);
    }
]);