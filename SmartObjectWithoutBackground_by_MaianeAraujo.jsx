// ------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
// ----------------------------------------- DEVELOPED BY MAIANE ARAUJO | GRAPHIC DESIGNER ----------------------------------------- //
// ------------------------------------------------------------  :)      www.maiane.com.br    :)  ------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
#target photoshop
app.bringToFront();


var smartObjectDoc;

//Curret file is defined as the source file
var doc = app.activeDocument;

//Get current layer's properties
var originalLayer = doc.activeLayer;
var originalLayerBounds = originalLayer.bounds;
var layerLocked = originalLayer.allLocked;
var layerBlendMode = originalLayer.blendMode;
var layerFillOpacity = originalLayer.fillOpacity;
var layerFilterMaskDensity = originalLayer.filterMaskDensity;
var layerFilterMaskFeather = originalLayer.filterMaskFeather;
var layerGrouped = originalLayer.grouped;
var layerMaskDensity = originalLayer.layerMaskDensity;
var layerMaskFeather = originalLayer.layerMaskFeather;
var linkedLayers = originalLayer.linkedLayers;
var layerName = originalLayer.name;
var layerOpacity = originalLayer.opacity;
var layerPixelsLocked = originalLayer.pixelsLocked;
var layerPositionLocked = originalLayer.positionLocked;
var layerTrasparentPixelsLocked = originalLayer.trasparentPixelsLocked;
var layerVectorMaskDensity = originalLayer.vectorMaskDensity;
var layerVectorMaskFeather = originalLayer.vectorMaskFeather;
var layerVisible = originalLayer.visible;
var layerParent = originalLayer.parent;
var layerIndex = getLayerIndex();

var layerBounds = originalLayer.bounds;
var widthOriginalDoc = originalLayerBounds[2] - originalLayerBounds[0];
var heightOriginalDoc = originalLayerBounds[3] - originalLayerBounds[1];



// --------  MAIN FUNCTION -------- // 
if (originalLayer.kind == LayerKind.SMARTOBJECT){
    
    openSmartObject();
    smartObjectDoc = activeDocument;
    
    //Check if it's a Background Layer
    if (smartObjectDoc.activeLayer.isBackgroundLayer){
        
        smartObjectDoc.activeLayer.isBackgroundLayer = false;
        smartObjectDoc.activeLayer.name = layerName;
        var smartObjectLayerBounds = smartObjectDoc.activeLayer.bounds;
        var widthSmartObject = smartObjectLayerBounds[2] - smartObjectLayerBounds[0]
        var heightSmartObject = smartObjectLayerBounds[3] - smartObjectLayerBounds[1]

        convertToSmartObject();
        smartObjectDoc.activeLayer.duplicate (doc, ElementPlacement.PLACEATBEGINNING);
        smartObjectDoc.close(SaveOptions.DONOTSAVECHANGES);
        activeDocument = doc;
        var newLayer = doc.activeLayer;
        newLayer.resize(widthOriginalDoc*100/widthSmartObject, heightOriginalDoc*100/heightSmartObject, AnchorPosition.MIDDLECENTER);
         
        var positionNewLayer = newLayer.bounds;
        positionNewLayer[0] = originalLayerBounds[0] - positionNewLayer[0];
        positionNewLayer[1] = originalLayerBounds[1] - positionNewLayer[1];
        newLayer.translate(positionNewLayer[0],positionNewLayer[1]);
        
        newLayer.move(layerParent, ElementPlacement.INSIDE);
        
      
       
        //Restore layers properties
        newLayer.allLocked = layerLocked;
        newLayer.blendMode = layerBlendMode;
        newLayer.fillOpacity = layerFillOpacity;

        if (layerGrouped){
            newLayer.grouped = true;
        }
        
        newLayer.linkedLayers = linkedLayers;
        newLayer.name = layerName;
        newLayer.opacity = layerOpacity;
        newLayer.pixelsLocked = layerPixelsLocked;
        newLayer.positionLocked = layerPositionLocked;
        newLayer.trasparentPixelsLocked = layerTrasparentPixelsLocked;
        newLayer.visible = layerVisible;
        //newLayer.filterMaskDensity = layerFilterMaskDensity
        //newLayer.filterMaskFeather = layerFilterMaskFeather
        //newLayer.layerMaskDensity = layerMaskDensity
        //newLayer.layerMaskFeather = layerMaskFeather
        //newLayer.vectorMaskDensity = layerVectorMaskDensity
        //newLayer.vectorMaskFeather = layerVectorMaskFeather

        //Define the layer position at the layer panel
        newLayer.move(layerParent.artLayers[layerIndex], ElementPlacement.PLACEAFTER)
        
        //Delete the original layer
        originalLayer.remove();
        
        alert ("It's done! :D Now, just keep doing your happy work. \n \n Developed by Maiane Araujo \n www.maiane.com.br");

    } else {
            alert ("Your Smart Object is already on the editable mode. :)");
    };

    
} else {
    
    alert ("This is not a smart object. :( \nTry to select the smart object you want to edit and run the script again.");

};

function moveLayerTo(fLayer,fX,fY) {

  var Position = fLayer.bounds;
  Position[0] = fX - Position[0];
  Position[1] = fY - Position[1];

  fLayer.translate(-Position[0],-Position[1]);
}

function openSmartObject (){
    var idplacedLayerEditContents = stringIDToTypeID( "placedLayerEditContents" );
    var desc7 = new ActionDescriptor();
    executeAction( idplacedLayerEditContents, desc7, DialogModes.NO );
};

function convertToSmartObject(){
    var idnewPlacedLayer = stringIDToTypeID( "newPlacedLayer" );
    executeAction( idnewPlacedLayer, undefined, DialogModes.NO );
};

function getLayerIndex(){
    for (var index = 0; index < layerParent.artLayers.length; index++){
        if (layerParent.artLayers[index].name == layerName) {
            return index;
            break;
        }
    }
}

   
        