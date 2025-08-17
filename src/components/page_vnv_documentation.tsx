'use client';
import { useState } from "react"
import DocumentationRow from "./documentation_row";

export default function PageVNVDocumentationWrapper(props: any) {
    const [currentSection, setCurrentSection] = useState('Introduction')

    let SetSection = (section: string) => {
        console.log(section)
        setCurrentSection(section)
    }

    //#region code strings
    let projectJSON = `{
    "projectName":"New Project",
}`
    let characterJSON = `[
    {
        "name":"Shion",
        "animations":[],
        "images":[
            {
                "filename":"stage.jpg",
                "id":"stage"
            }
        ],
        "sounds":[
            {
                "filename":"",
                "id":"hello"
            }
        ]
    }
]`

    let flagJSON = `[
    "Flag1",
    "Flag2",
    "Flag3"
]`

    let soundJSON = `[
     {
         "filename":"scream.mp3",
         "id":"Scream"
     },
     {
         "filename":"crying.mp3",
         "id":"cry"
     }
 ]`

    let variableJSON = `[
    {
        "key":"player",
        "value":"Levon"
    },
    {
        "key":"trust",
        "value":"0"
    }
]`

    let sceneJSON = `[
    {
        "background": "classroom.jpg",
        "name": "Episode2"
        "events": [
            //Event objects
        ]
    }
]`

    let eventJSON = `{
    "id": 100,
    "type": "simple"
    "metaData": {
        "speech": "Hello, $player I {love|b|color,red} that {new|color,yellow} look",
        "name": "Shion",
        "characters": [
            // Character Object data
        ],
        "sounds": [
            // Sound Object data
        ],
    },
    "routes": [
        // Routes data
    ],
}`

    let simpleEventType = `{
    "id": 1,
    "type": "simple",
    "metaData": {
        "name": "John",
        "speech": "Whaa...?"
    },
    "routes": [
        //roue data
    ],
},`

    let textInputType = `{
    "id": 1,
    "type": "textInput",
    "metaData": {
        "inputText": "Insert your name.",
        "variable": "player"
    },
    "routes": [
        //route data
    ],
}`

    let answerType = `{
    "id": 1,
    "type": "answer",
    "routes": [
        {
            "metaData": {
                "text": "Walk down the left path."
            },
            "next": 2,
            "type": "answer"
        },
        {
            "metaData": {
                "text": "Walk down the right path."
            },
            "next": 3,
            "type": "answer"
        }
    ],
}`

    let character = `"characters": [
    {
        "change": "add",
        "metaData": {
            "location": "right"
        },
        "name": "Shion",
        "resourceId": "0",
        "resourceType": "image"
    },
    {
        "change": "play",
        "metaData": {},
        "name": "Shion",
        "resourceId": "0",
        "resourceType": "voice"
    }
]`

    let sounds = `[
    {
        "action": "play",
        "id": "theme",
        "type": "music"
    }
]`

    let routes = `[
    {
        "metaData": {
            "text": "Who, What, Where, When, Why..."
        },
        "next": 104,
        "type": "answer"
    },
    {
        "metaData": {
            "text": "Uhhh, 5 more minutes."
        },
        "next": 110,
        "type": "answer"
    }
]`
    //#endregion


    let GetSection = () => {
        if (currentSection == 'Introduction') {
            return (
                <div>
                    <h1>Introduction</h1>
                    <p>The Visual Novel Visualizer (VNV) is a tool for creating the data needed to power a visual novel. It will allow you the ability to see all your information in one location along with a visualization of the flow of dialog.</p>
                    <p>While the data structure created by the visualizer is meant to be used with the Visual Novel Engine (VNE), it can be integrated with any game/code project.</p>
                </div>
            )
        } else if (currentSection == 'Getting Started') {
            return (
                <div>
                    <h1>Getting Started</h1>
                    <p>You can download the required VNV Editor here: Placeholder</p>
                    <p>You can download the VN Engine here: Placeholder</p>
                    <p>You can start with creating the dialog and resources using the VNV Editor. First run the VNV and create a new project. When you have finished adding data you can export the project to the base directory of you VNE project.</p>
                </div>
            )
        } else if (currentSection == 'Project Structure') {
            return (
                <div>
                    <h1>Project Structure</h1>
                    <h3>Project file</h3>
                    <p>The project file uses a .vnv extension. This file contains basic project information and is considered the base directory for your project </p>
                    <p>example:</p>
                    <div className="code"><code>{projectJSON}</code></div>
                    <br></br>
                    <h3>Data Files</h3>
                    <p>The VNV stores information in a data directory which stores creates several files and sub-directories. The following files contain all the non-resource data.</p>
                    <ul>
                        <DocumentationRow linkCallback={SetSection} header={'GlobalCharacters.json'} body={'Stores the information for <link>characters#!Characters</link> in your game along with the resource information for each character.'}></DocumentationRow>
                        <DocumentationRow linkCallback={SetSection} header={'GlobalFlags.json'} body={'Stores the information for all <link>flags#!Flags</link>.'}></DocumentationRow>
                        <DocumentationRow linkCallback={SetSection} header={'GlobalSounds.json'} body={'Stores the resource information for <link>sound/music#!Sounds</link>.'}></DocumentationRow>
                        <DocumentationRow linkCallback={SetSection} header={'GlobalVariables.json'} body={'Stores the information for all <link>variables#!Variables</link>.'}></DocumentationRow>
                        <DocumentationRow linkCallback={SetSection} header={'scenes.json'} body={'Stores the information for each <link>scene#!Scenes</link>.'}></DocumentationRow>
                    </ul>
                    <br />
                    <h3>Resource Files</h3>
                    <p>The Resources (pictures,Audio,etc...) are stored in two sub-directories inside of the data folder based on the type of resource:</p>
                    <ul>
                        <li>images</li>
                        <li>sounds</li>
                    </ul>
                </div>
            )
        } else if (currentSection == 'Characters') {
            return (
                <div>
                    <h1>Characters</h1>
                    <p>The information for all the characters used between scenes are stored in the GlobalCharacters.json. A Character has a name and 3 types of resources linked to it.</p>
                    <DocumentationRow header={'name'} body={'The name of the character that can be referenced.'}></DocumentationRow>
                    <h3>Character Resource types</h3>
                    <DocumentationRow header={'Animation'} body={'Not implemented yet.'}></DocumentationRow>
                    <DocumentationRow header={'Sounds'} body={'Any dialog or sounds the character can make throughout the game.'}></DocumentationRow>
                    <DocumentationRow header={'Images'} body={'Any images of the character that can be displayed throughout the game.'}></DocumentationRow>
                    <h3>Resource Data</h3>
                    <p>Each resource has 2 bits of data associated with it.</p>
                    <DocumentationRow header={'filename'} body={'The name of the file stored on disk.'}></DocumentationRow>
                    <DocumentationRow linkCallback={SetSection} header={'id'} body={'The identifier used in an <link>event#!Events</link> to link back to the resource.'}></DocumentationRow>
                    <br />
                    <p>Example JSON:</p>
                    <div style={{marginLeft:'20px'}} className="code"><code>{characterJSON}</code></div>
                </div>
            )
        } else if (currentSection == 'Flags') {
            return (
                <div>
                    <h1>Flags</h1>
                    <p>The information for all the flags that can be used are stored in the GlobalFlags.json. These flags would be referenced and/or the value updated in an event.</p>
                    <p>Each flag is stored in an array with only the name. Due to this, the engine assumes a default value of false when a new game is started. </p>
                    <h3>Example JSON:</h3>
                    <div style={{marginLeft:'20px'}} className="code"><code>{flagJSON}</code></div>
                </div>
            )
        } else if (currentSection == 'Sounds') {
            return (
                <div>
                    <h1>Sounds</h1>
                    <p>The sound data is stored in the GlobalSounds.json. The sounds can be referenced in an event using the id to be played as music or a sound effect.</p>
                    <h3>Sound Data</h3>
                    <p>Each sound has 2 bits of data associated with it:</p>
                    <DocumentationRow header={'filename'} body={'The name of the file stored on disk'}></DocumentationRow>
                    <DocumentationRow linkCallback={SetSection} header={'id'} body={'The identifier used in an <link>event#!Events</link> to link back to the sound resource'}></DocumentationRow>
                    <h3>Example JSON:</h3>
                    <div style={{marginLeft:'20px'}} className="code"><code>{soundJSON}</code></div>
                </div>
            )
        } else if (currentSection == 'Variables') {
            return (
                <div>
                    <h1>Variables</h1>
                    <p>The variable data is stored in the GlobalVariables.json. The variables can be referenced/updated from an event. Each variable is stored with a name and a default value:</p>
                    <h3>Variable Data</h3>
                    <DocumentationRow linkCallback={SetSection} header={'Key'} body={'Name of the variable used for referencing from an <link>event#!Events</link>.'}></DocumentationRow>
                    <DocumentationRow header={'Value'} body={'Default value of the variable.'}></DocumentationRow>
                    <h3>Example JSON:</h3>
                    <div style={{marginLeft:'20px'}} className="code"><code>{variableJSON}</code></div>
                </div>
            )
        } else if (currentSection == 'Scenes') {
            return (
                <div>
                    <h1>Scenes</h1>
                    <p>The scene data is stored in the Scenes.json. Scenes are a series of one or more dialogs. Scene hold the following information:</p>
                    <h3>Scene Data</h3>
                    <DocumentationRow header={'background'} body={'The initial background the scene should display.'}></DocumentationRow>
                    <DocumentationRow header={'name'} body={'The name of the scene which is used when referencing the scene.'}></DocumentationRow>
                    <DocumentationRow linkCallback={SetSection} header={'<link>events#!Events</link>'} body={'An array of the events in the scene.'}></DocumentationRow>
                    <h3>Example JSON:</h3>
                    <div style={{marginLeft:'20px'}} className="code"><code>{sceneJSON}</code></div>
                </div>
            )
        } else if (currentSection == 'Events') {
            return (
                <div>
                    <h1>Events</h1>
                    <p>Events are the blocks that compose a scene. An event will typically be dialog but have several types ranging from input to choices to conditional branches.</p>
                    <p>Every event has two required pieces of information an Id and a type. The Id is a unique number used to specify the event while the type is used to determine what metadata is required.</p>
                    <br />
                    <h3>Variables:</h3>
                        <DocumentationRow header={`id - Number`} body={`Unique identifier for the event.`}></DocumentationRow>
                        <DocumentationRow header={`type - string`} body={`TIndicates what type of event. Each type has required metadata for it to function properly.  identifier for the event.`}></DocumentationRow>
                        <DocumentationRow header={`metaData - object`} body={`Collection of key values that store information for the event. \n Note: The character and sound actions are stored in the metadata even though they appear separate in the editor.`}></DocumentationRow>
                        <DocumentationRow header={`routes - Array of route objects`} body={`Routes are used to navigate to other events, scenes, or end a event chain. Each event should have at least one route but can have multiple of you want to route based on conditions or user choices. `}></DocumentationRow>
                    <h3>Example JSON:</h3>
                    <div className="code"><code>{eventJSON}</code></div>
                </div>
            )
        } else if (currentSection == 'Event Types') {
            return (
                <div>
                    <h1>Event Types</h1>
                    <p>Each event has a specified type. The type will determine what metaData is required for the event to function properly.</p>
                    <h3>simple</h3>
                    <DocumentationRow header={`name - string`} body={`The name to be displayed at the top of the dialog box.`}></DocumentationRow>
                    <DocumentationRow header={`speech - string`} body={`The text to be displayed in the dialog box.`}></DocumentationRow>
                    <div style={{marginLeft:'20px'}} className="code"><code>{simpleEventType}</code></div>
                    <h3>textInput</h3>
                    <DocumentationRow header={`inputText - string`} body={`The text to be displayed in the prompt.`}></DocumentationRow>
                    <DocumentationRow header={`variable - string`} body={`The variable that will store the input from the player.`}></DocumentationRow>
                    <div style={{marginLeft:'20px'}} className="code"><code>{textInputType}</code></div>
                    <h3>answer</h3>
                    <DocumentationRow header={`Route (answer type) - object`} body={`At least one route with the answer type is required.`}></DocumentationRow>
                    <div style={{marginLeft:'20px'}} className="code"><code>{answerType}</code></div>
                </div>
            )
        } else if (currentSection == 'Event Metadata') {
            return (
                <div>
                    <h1>Event Metadata</h1>
                    <p>The metadata holds all the data relevant to an event besides the id, type, and routes. Certain event types require specific metadata but the majority of metadata can be used by any event type.</p>
                    <DocumentationRow header={'name - string'} body={'The text displayed at the top of the dialog of a speech event. \n Event: simple'}></DocumentationRow>
                    <DocumentationRow header={'speech - string'} body={'The text to show in the dialog box of a speech event. \n Event: simple'}></DocumentationRow>
                    <DocumentationRow header={'text - string'} body={'The text that displays in an option for a route. \n Event: question \n Route: answer'}></DocumentationRow>
                    <DocumentationRow header={'location - string'} body={'Location where a character image will appear. Used in the character metadata. \n Valid options: left, right, center. \n Event: Any \n Character: Image'}></DocumentationRow>
                    <DocumentationRow header={'inputText - string'} body={'The text that displays as a prompt for a player to answer \n Event: textInput'}></DocumentationRow>
                    <DocumentationRow header={'variable - string'} body={'The variable to update. \n Valid options: Any existing variable \n Event: textInput '}></DocumentationRow>
                    <DocumentationRow header={'characters - Array of character objects'} body={'A list of actions to be taken for characters which range from adding/removing images to playing a audio clip \n Event: Any'}></DocumentationRow>
                    <DocumentationRow header={'sounds - Array of Sound objects'} body={'A list of  actions to be taken for sound resources which range from playing/stopping sfx or music. \n Event: Any'}></DocumentationRow>
                </div>
            )
        } else if (currentSection == 'characters') {
            return (
                <div>
                    <h1>Characters (event)</h1>
                    <p>Any event can have 0 or more actions to be taken with a character. The current supported actions are showing/moving/hiding a character image and playing a character audio clip.</p>
                    <h3>Variables:</h3>
                    <DocumentationRow header={'name'} body={'The name of the character whose resource you want to use. \n Valid Values: Any character name that has been added to the global characters'}></DocumentationRow>
                    <DocumentationRow header={'resourceType'} body={'The type of character resource you want to use. \n Valid Values: voice, image '}></DocumentationRow>
                    <DocumentationRow header={'resourceId'} body={'The Id of the resource you want to edit. \n Valid Values: Any Id that has been added to the resources for the referenced character and resource type'}></DocumentationRow>
                    <DocumentationRow header={'change'} body={'The action which will occur. \n Valid Values: add, remove, move, play'}></DocumentationRow>
                    <DocumentationRow header={'metadata'} body={'Collection of key value pairs.'}></DocumentationRow>
                    <h3>Metadata</h3>
                    <DocumentationRow header={'location'} body={'The location on the page where a character image will be add/moved to. \n Valid Values: left, right, and center'}></DocumentationRow>
                    <h3>Example JSON:</h3>
                    <div className="code"><code>{character}</code></div>
                </div>
            )
        } else if (currentSection == 'sounds') {
            return (
                <div>
                    <h1>Sounds</h1>
                    <p>Any event can have 0 or more actions to be taken with a sound resource. The current supported actions are playing/stopping music or a sfx.</p>
                    <h3>Variables:</h3>
                    <DocumentationRow header={'id - string'} body={'The id of the sound resource to play. \n Valid Values: Any id of a sound resource'}></DocumentationRow>
                    <DocumentationRow header={'action - string'} body={'The action that will be taken with the sound resource. \n Valid Values: play, stop'}></DocumentationRow>
                    <DocumentationRow header={'type - string'} body={'The type of sound that will play. \n Valid Values: music, sfx'}></DocumentationRow>
                    <h3>Example JSON:</h3>
                    <div className="code"><code>{sounds}</code></div>
                </div>
            )
        }  else if (currentSection == 'Event Routes') {
            return (
                <div>
                    <h1>Routes</h1>
                    <p>Every event should have at least one route. Each route directs the current event to the next event.</p>
                    <h3>Variables:</h3>
                    <DocumentationRow header={'type'} body={'The type of route. \n Valid Values: simple, answer'}></DocumentationRow>
                    <DocumentationRow header={'next'} body={'The id of the event that the route should navigate to. \n Valid Values: An id of an event in the current scene'}></DocumentationRow>
                    <DocumentationRow header={'metaData'} body={'Collection of key value pairs.'}></DocumentationRow>
                    <h3>Metadata:</h3>
                    <DocumentationRow header={'text'} body={'Text to be displayed for the player answer.'}></DocumentationRow>
                    <h3>Example JSON:</h3>
                    <div className="code"><code>{routes}</code></div>
                </div>
            )
        } else if (currentSection == 'Text Features') {
            return (
                <div>
                    <h1>Text Features</h1>
                    <p>The engine supports several features that allow for greater flexibility when displaying text to the player.</p>
                    <h3>Supported Metadata</h3>
                    <DocumentationRow header={'name'} body={`Event Type: Simple`}></DocumentationRow>
                    <DocumentationRow header={'speech'} body={`Event Type: Simple`}></DocumentationRow>
                    <DocumentationRow header={'text'} body={`Event Type: Answer`}></DocumentationRow>
                    <DocumentationRow header={'inputText'} body={`Event Type: TextInput`}></DocumentationRow>
                    <h3>Text Effects</h3>
                    <p>A variety of text effects can be applied. These effects can be applied through the UI or typed manually.</p>
                    <p>The desired text to be modified should be wrapped in {'{}'} with a | between the text and the effect. If the effect requires a parameter then the effect name and parameters should be separated by commas.</p>
                    <p>Effects:</p>
                    <DocumentationRow header={'color'} body={`Allows text to be be a different color then the default white. \nArguments: A name of a color \nExample: The {angry|color,red} tiger.`}></DocumentationRow>
                    <DocumentationRow header={'b'} body={`Bold the desired text.\nArguments: None \nExample: The {Big|b} bug.`}></DocumentationRow>
                    <h3>Variable Replacement</h3>
                    <p>Variables can be referenced when trying to display text to the player. The value of a variable will be used wherever {"$VariableName"} occurs.</p>
                    <p>Example:</p>
                    <div style={{marginLeft:'20px'}} className="code"><code>{`"speech": "Hey $playerName, did you see the game last night?" \n\n//In this case $playerName would be replaced by the current value of the playerName variable`}</code></div>
                </div>
            )
        } else if (currentSection == 'Exporting') {
            return (
                <div>
                    <h1>Exporting</h1>
                    <p>Once you have finished creating the data for your visual novel project. You can export that to any location which will copy the projects data folder to whatever destination you want to export it to. If the data is to be used with the VNE, it should be exported to the base directory of the Godot project.</p>
                </div>
            )
        } else {
            return <div></div>
        }
    }


    return (
        <div style={{ display: 'flex', gap: '50px' }}>
            <div style={{ minWidth: '150px', flex: 1.5, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div onClick={() => SetSection('Introduction')}>Introduction</div>
                <div onClick={() => SetSection('Getting Started')}>Getting Started</div>
                <div onClick={() => SetSection('Project Structure')}>Project Structure</div>
                <div style={{ paddingLeft: '10px' }}>
                    <div onClick={() => SetSection('Characters')}>Global Characters</div>
                    <div onClick={() => SetSection('Flags')}>Global Flags</div>
                    <div onClick={() => SetSection('Sounds')}>Global Sounds</div>
                    <div onClick={() => SetSection('Variables')}>Global Variables</div>
                    <div onClick={() => SetSection('Scenes')}>Scenes</div>
                </div>
                <div onClick={() => SetSection('Events')}>Events</div>
                <div style={{ paddingLeft: '10px' }}>
                    <div onClick={() => SetSection('Event Types')}>Event Types</div>
                    <div onClick={() => SetSection('Event Metadata')}>Metadata</div>
                    <div style={{paddingLeft:'20px'}}>
                        <div onClick={() => SetSection('characters')}>Characters</div>
                        <div onClick={() => SetSection('sounds')}>Sounds</div>
                    </div>
                    <div onClick={() => SetSection('Event Routes')}>Routes</div>
                </div>
                <div onClick={() => SetSection('Text Features')}>Text Features</div>
                <div onClick={() => SetSection('Exporting')}>Exporting</div>
            </div>
            <div style={{ height: '100%', flex: 8, display: 'flex', flexDirection: 'column' }}>
                {GetSection()}
            </div>
        </div>
    )
}