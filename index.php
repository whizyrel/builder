<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Builder</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div>
        Instructions
        <button><a href="instructions.html" target="_blank">Click Me</a></button>
    </div>
    <div class="errorBox">
        please fill in the empty fields
    </div>

    <div class="addConsole">
        <div class="titleConsole">
            <h3>Enter Book title</h3>
            <input class="title" type="text" placeholder="Genesis, Exodus, Leviticus, Numbers...">
        </div>
        
        <div class="ChapterConsole">
            <h3>Enter Chapter number</h3>
            <input class="chapterNumber" type="number">
            <button class="addChapterNo">Add</button>
        </div>

        <div class="verseConsole">
            <h3>Enter verses</h3>
            <textarea class="verse" cols="60" rows="5"></textarea>
            <button class="addButton">Add</button>

            <div class="console">
                <div>
                    <button class="addNewChapter">Add Chapter</button>
                    <button class="submit">Submit</button>
                    <button class="download"><a class='downloadFile' download>Download</a></button>
                </div>
            </div>
        </div>
    </div>

    <div class="showInput">
        <p>Verses added</p>
    </div>

    <script src="app.js"></script>
</body>
</html> 