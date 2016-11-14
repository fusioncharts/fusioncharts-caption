FusionCharts.register('module', ['private', 'modules.renderer.js-extension-caption',
    function() {

        var global = this,
            lib = global.hcLib,
            parseUnsafeString = lib.parseUnsafeString,
            pluckNumber = lib.pluckNumber,
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
                    Caption = FusionCharts.register('COMPONENT', ['CAPTION', 'CAPTION']),
                    components = iapi.components || (iapi.components = {}),
                    caption = components.caption,
                    subCaption = components.subCaption,
                    captionConfig = caption.config,
                    subCaptionConfig = subCaption.config;

                caption || (caption = new Caption());
                caption.init();
                caption.chart = iapi;
                caption.configure();
                caption.manageSpace(config.height);
                caption.managePosition();

                config.origMarginTop = pluckNumber(chartAttrs.charttopmargin, iapi.chartTopMargin, 15);
                config.origMarginLeft = pluckNumber(chartAttrs.chartleftmargin, iapi.chartLeftMargin, 15);
                config.origMarginBottom = pluckNumber(chartAttrs.chartbottommargin, iapi.chartBottomMargin, 15);
                config.origMarginRight = pluckNumber(chartAttrs.chartrightmargin, iapi.chartRightMargin, 15);

                captionConfig.y += config.origMarginTop;
                subCaptionConfig.y += config.origMarginTop;

                captionConfig.x += config.origMarginLeft - config.origMarginRight;
                subCaptionConfig.x += config.origMarginLeft - config.origMarginRight;

                components.caption && components.caption.draw();
            }
        }]);
    }
]);