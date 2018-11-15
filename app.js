{
    "use strict";

    let dataHandler, UIHandler, mainHandler;

    dataHandler = (() => {
        let book;

        book = {
            "title": '',
            "chapters": [
                {
                    "name": '',
                    "verses": [

                    ]
                }
            ]
        };

        return {
            addVerse: obj => {
                // {bookTitle: "", chapterNumber: "", verse: ""}
                book.chapters[book.chapters.length - 1].verses.push(obj.verse);
            },
            addNewChapter: () => {
                let chapter;

                chapter = {
                    "name": '',
                    "verses": [

                    ]
                };

                book.chapters.push(chapter);
            },
            addTitle: (obj) => {
                // {bookTitle: "", chapterNumber: "", verse: ""}
                book.title = obj.bookTitle;
            },
            addChapterNo: (obj) => {
                // {bookTitle: "", chapterNumber: "", verse: ""}
                book.chapters[book.chapters.length - 1].name = `Chapter ${parseInt(obj.chapterNumber)}`;
            },
            downloadFile: (book) => {
                // get file
                // make a file with blob
                const file = new File([JSON.stringify(book)], 'foo.txt', {
                    type : 'application/json'
                });
                const url = URL.createObjectURL(file);

                return {
                    fileName: () => {

                    },
                    file: () => {
                        return file;
                    },
                    url: () => {
                        return url;
                    }
                };
            },
            getBook: () => {
                return book;
            }
        };
    })();

    UIHandler = (() => {
        let DOMStrings, title, chapterNum, verse;

        DOMStrings = {
            errorBox: '.errorBox',
            addVerseButton: '.addButton',
            addNewChapter: '.addNewChapter',
            titleBox: '.title',
            addChapterNo: '.addChapterNo',
            chapterBox: '.chapterNumber',
            verseBox: '.verse',
            submitButton: '.submit',
            downloadButton: '.download',
            downloadFile: '.downloadFile',
            showBox: '.showInput'
        };

        title = document.querySelector(DOMStrings.titleBox);
        chapterNum = document.querySelector(DOMStrings.chapterBox);
        verse = document.querySelector(DOMStrings.verseBox);

        return {
            getInput: () => {
                return {
                    bookTitle: title.value,
                    chapterNumber: chapterNum.value,
                    verse: verse.value
                };
            },
            clearVerseField: () => {
                verse.value = '';
            },
            clearChapterField: () => {
                chapterNum.value = '';
            },
            clearFields: () => {
                let fields;

                const allFields = document.querySelectorAll(`${DOMStrings.titleBox}, ${DOMStrings.chapterBox}, ${DOMStrings.verseBox}`);
                
                fields = Array.from(allFields);

                fields.forEach(cur => {
                    // @ts-ignore
                    cur.value = '';
                });
            },
            showVerses: (verse) => {
                // add verse into DOM
                const el = '<div>%val%</div>';
                const last = el.replace('%val%', verse); 
                document.querySelector(DOMStrings.showBox).insertAdjacentHTML('beforeend', last);
            },
            showInstruction: () => {
                document.querySelector(DOMStrings.errorBox).style.display = 'block';
            },
            downloadFile: (obj, data) => {
                const dwnLink = document.querySelector(DOMStrings.downloadFile);
                dwnLink.download = data.title;
                dwnLink.href = obj.url();
            },
            getDOMStrings: () => {
                return DOMStrings;
            }
        };
    })();

    // @ts-ignore
    mainHandler = ((dtCtrl, UICtrl) => {
        let setEventListener, sumbitData, addVerses, UIStrings, addNewChapter, addChapterNo, download;

        UIStrings = UICtrl.getDOMStrings();

        setEventListener = ()=> {
            document.querySelector(UIStrings.submitButton).addEventListener('click', sumbitData);
            document.querySelector(UIStrings.addVerseButton).addEventListener('click', addVerses);
            document.querySelector(UIStrings.addNewChapter).addEventListener('click', addNewChapter);
            document.querySelector(UIStrings.addChapterNo).addEventListener('click', addChapterNo);
            document.querySelector(UIStrings.downloadButton).addEventListener('click', download);
        };

        download = () => {
            // call method to make file
            const fileProp = dtCtrl.downloadFile(dtCtrl.getBook());
            UICtrl.downloadFile(fileProp, dtCtrl.getBook());
            console.log('Download Started');
        };

        addChapterNo = () => {
            dtCtrl.addChapterNo(UICtrl.getInput());
        };

        addVerses = () => {
            dtCtrl.addVerse(UICtrl.getInput());
            // show verses
            UICtrl.showVerses(UICtrl.getInput().verse);
            UICtrl.clearVerseField();
        };

        addNewChapter = () => {
            // call add chapter method that adds a new chapter to data structure
            dtCtrl.addNewChapter();
            UICtrl.clearChapterField();
        };

        sumbitData = () => {
            const cond = UICtrl.getInput().verse || (UICtrl.getInput().chapterNumber && UICtrl.getInput().bookTitle);
            
            if (cond !== '' && cond !== undefined && cond !== null) {
                dtCtrl.addTitle(UICtrl.getInput());
                console.log(dtCtrl.getBook());
                UICtrl.clearFields();
            } else {
                // show error instruction
                UICtrl.showInstruction();
            }
        };

        return {
            init: () => {
                setEventListener();
                console.log('App initialised');
            }
        };
    })(dataHandler, UIHandler);

    mainHandler.init();
}