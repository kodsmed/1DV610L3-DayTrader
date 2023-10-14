# Kodkvalitetskrav

## Instruktioner - kapitel 2

Skapa en tabell över fem namn på identifierare (Ex. namn på klasser, metoder/funktioner och variabler) som finns i ditt publika interface hos modulen. Det publika interfacet är alltså den kod som andra programmerare ska använda. Utgå ifrån kapitel-2s titlar och ange de viktigaste “reglerna” som applicerats eller skulle kunna appliceras på just ditt namn. Försök variera regler mellan namnen så att inte alla har samma titlar applicerade. Visa upp att ni förstår flera regler och inte bara ett par.

Ange även en kort reflektion kring innehållet i kapitel 2. Ni kanske upptäcker en brist hos er tidigare namngivning, ni kanske inte håller med någon av “reglerna” från kursboken. Jag ser hellre att ni hittar och reflekterar över era brister än att ni döljer dem.

### NOTIS

Jag har valt att låta reflektioner kring min moduls namngivning inte vara en del av reflektionen kring kapitel 2, utan kommer istället i reflektionen kring våra erfarenheter. Den lösningen kändes mer naturlig för mig, och mer Seperations of Concerns än att blanda in det i kapitel 2s reflektion.

## Tabell över identifierare

| Identifier | Rule | Reflection |
| --- | --- | --- |
| GraphDrawer | Classnames should be a noun | A class is a thing, a drawer is a thing. To give it the name of the component felt natural since its the class that defines the HTML component. |
| | Avoid Misinformation | Initially, it was named GraphDrawer2000... to cool it. I renamed it after the seminar. |
| - | - | - | - | - | - |
| renderArrayAsGraph | Methods should be verbs | The name of the method reflects what it does. |
| | Use Intention based naming |  Yes, what it says is what it does. |
| | Add meaningful context | Thou maybe superfluous, the added Array in the name gives the information, for free, that the input should be an array. |
| - | - | - | - | - | - |
| FontSetting.title | Use Intention based naming | This getter is not the best example, it returns a cxt.font string '12px Arial' and that is not obvious from the name. titleFontStyleString could be better. |
| - | - | - | - | - | - |
| verifyDatasetIntegrity | Methods should be verb | The name of the method describes what it does, validated the array dataset and its entries.|
| | Use Intention based naming | The name of the method describes what id does. |
| | Do not pun | No pun here. |
| - | - | - | - | - | - |
| nonMagicZero | Don't be cute | Well... guilty as charged on this one. Origo would have been better... and |
| | Use Problem Domain Names | ... I should have used that name instead. |

### Slutsats kring identifierare

De flesta av mina namn är acceptabla, men jag har också hittat ett par som jag borde ändra i senare iterationer.

## Reflektion över kapitel 2

get this as pdf [here](./.kodkvalitetskrav/L2%20-%20reflection%20chapter%202.pdf)

In the words of Theodore Parker “The books which help you most are those which make you think the most.  
The hardest way of learning is by easy reading; but a great book that comes from a great thinker – it is a ship of thought, deep freighted with truth and beauty.”

Chapter two of Clean Code titled “Meaningful names”, fails to inspire such contemplation.  
Instead, it smothers any fleeting spark of thought with overwhelming, overwrought explanations,  
sending even the most valiant decorator pattern fleeing in abashed retreat .

Were the chapter about how to tie a shoelace, readers would be granted a convoluted journey through the history of shoelaces,  
culminating in a philosophical debate on the cultural complexity of “left over right” vs “right over left”.  
With the possibility of a tangent on the moral implication of uneven loops.  
Pardon my exaggeration for effect… but it carries the point across.  
Namely, in way too many words I have said very little.

“Meaningful names” is not devoid of good ideas and valuable insight,  
these just get muffled by verbosity.  
As Edouard Manet once said, “The concise man makes one think: the verbose bores”.  
I firmly believe that the fifteen rules that manage to cover thirteen pages together,  
could be distilled into a sentence or two each… rendering them, quite fittingly, more meaningful.

### TLDR version of Meaningful names

Names should be **distinct, consistent**, and to as precise a degree as possible **describe** the nature or purpose of what they represent.

**Distinct**: names should be unique for ease of searching and to eliminate confusion. As an example, avoid using ‘account’ and ‘accounts’ in the same project.

**Consistent**: names should mean the same and help developers understand the codes intent. If you use ‘fetch’ to retrieve external data, stick to that and avoid suddenly using for example ‘get’.

**Descriptive**:

- A method name should describe its action. Example: ‘writeTextToFile(text, filename)’ clearly indicates what action it takes:  
writing the text to a file.
- A variable name should describe its nature. Example: ‘xCoordinate’ indicates a position on the x-axis. ‘heightToWidthRatio’ is a number containing height compared to width.

## Instruktioner - kapitel 3

Läs kapitel 3. Skapa en tabell över dina fem längsta metoder/funktioner. Utgå ifrån kapitel-3s titlar och ange de viktigaste reglerna (som följs/bryts). Föreslå förändringar.  

Ange även en kort reflektion kring innehållet i kapitel 3. Ni kanske upptäcker en brist hos er tidigare skrivning av funktionerna, ni kanske inte håller med någon av “reglerna” från kursboken. Jag ser hellre att ni hittar och reflekterar över era brister än att ni döljer dem.

### NOTIS

Jag har valt att låta reflektioner kring min moduls funktioner och metoder inte vara en del av reflektionen kring kapitel 3, utan kommer istället i reflektionen kring våra erfarenheter. Den lösningen kändes mer naturlig för mig, och mer Seperations of Concerns än att blanda in det i kapitel 3s reflektion.

### Tabell över funktioner/metoder

Jag har inte tagit hänsyn till om metoderna är publika eller privata utan bara tagit de fem längsta metoderna i min modul, ordagrant som de står i instruktionen. Ett billigt erkännande; jag har inte räknat ut längden på samtliga funktioner utan bara de som okulärt sticker ut som långa. Efter att ha skrivit tabellen framgick ett uppenbart refaktoringsbehov som jag framgångsrikt genomfört... jag har därför valt att ha med detta i tabellen. Därav är också tabellen mer än fem metoder lång, då den inkluderar både de metoder som är längst nu, och de som var längst innan refaktoriseringen.
Tabellen är sorterad efter nuvarande längd.

| Funktion/metod | Nuvarande rader | Rader innan refaktorisering | Regel | Reflektion |
| --- | --- | --- | --- | --- |
| drawXAxisLabelsAndVerticalLines | 39 | 39 |  Small! (Smaller!) | I've lost track of how many times I refactored and rewritten this method. It drawsLabels and a dotted vertical guideline above each label, but since its not doing this for every data the function becomes quite complex. The length of the dataset being unknown and special steps needs to be taken with datasets that have a length that is a prime number and there for not evenly dividable by anything adds to the complexity (You can't paint to .something of a pixel and rounding causes alignment issues). The one refactoring that made this smaller was extracting the pointGenerator. |
|||| Do one thing | Ish... one could argue that this is two things, but since the guideline is so closely tied to the label, on a certain abstraction level I consider this to be one, and the book tells us that it is up to us to define what constitutes one thing. "So what I told you was true... from a certain point of view" - Obi-Wan Kenobi. Additionally, splitting them would mean having another function looping over the array to find the proper places to draw, and that would A: impact performance, B: needlessly using electricity to do pointless repeated calculations (HOW DARE YOU!?!) and C: not be DRY.|
| - | - | - | - | - | - |
| GraphAndCanvasData.verifyParameterTypes | 29 | 37 | Small! (Smaller!!!) | This is still a bit long, but I've refactored it using the new isThisThatOrTheOther methods, that shortened it significantly. Further shortening is possible if I rewrite the method to take an argument-object, but this assignment have a limited allotted time, so the line must be drawn somewhere. |
|||| Argument objects | The method does not take an argument object, doing so would enable me to make it smaller. |
|||| Function arguments | It takes 9 arguments, every argument passed to the constructor. An argument object would be better. |
|||| Prefer Exceptions to Returning Error Codes | The function does not return an error code, it throws exceptions. |
|||| Error Handling is One Thing | The function does not handle errors, it just throws exceptions. |
| - | - | - | - | - | - |
| *pointGenerator | 29 | N/A | Small! (Smaller!!!) | This method calculates and yields point objects : { xCoordinate, yCoordinate } and in doing so it does a lot of calculations, the ratios between the dataset and the area on the canvas reserved for the graph, and the resulting output depending on the values in the dataset. Each of these calculations are single line, so extracting them would generate no benefit, there are just a lot of them. |
|||| Do one thing | The function does one thing, it calculates and yields point objects. |
|||| Monadic | The function is monadic, it only takes the one argument |
|||| Use descriptive names | The name of the function describes what it does. |
|||| Argument objects | The function does take an argument object. |
| - | - | - | - | - | - |
| setColors | 26 | 44 | Small! (Smaller!) | This function was way to long, having extracted the validation and automatically knowing all the objects passed in the argument is valid allowed my to simply iterate over the objects and overwrite any key that is present.  |
|||| Extract try-catch | I don't have any try-catch at all. The module throws exceptions if not used correctly. Since I have no idea how the user of the module wants to get the input or go about error handling there is no point in my using a try-catch.|
|||| Command Query Separation | The function does not return anything, it just sets the colors. Throwing exceptions is not a return. |
| - | - | - | - | - | - |
| validateSizeObject(sizeObject) | 26 | 48 |  Small! (Smaller!) | The function is still a bit long. I see the possibility of creating a datatype ccsStyleString. With that, the function could be shortened quite a bit by a simple instance of check. However, with the already significant decrease in length I've opted out of that approach. The line has to be drawn somewhere, and this isn't bad.|
|||| Argument objects | I did see the opportunity to create an argument object here, both for clarity and to reduce the amount of arguments required... So I did. |
| - | - | - | - | - | - |
| drawYAxisLabels | 25 | N/A | Small! (Smaller!) | This function is not overly complex, but it is long. It draws the labels on the Y-Axis, so it has to calculate where those should be, and what value they should be. Extracting the where calculation could save 4 rows... and not improve readability to any significant degree. So it is not done here. |
|||| Structured Programming | One entry point, one exit point... check. |
| - | - | - | - | - | - |
|validateAxisTitles(axisTitles)| 18 | 58 | Small! (Smaller!) || The function was a bit long, but not overly complex. As a validator method it was just several if statements. However I saw the possibility of breaking out 'is' methods isOfSameType(object, object) isObject, isString etc that shortened it quite a bit. |
|||| Do one thing | The function does one thing, it validates the axisTitles array. |
|||| Use descriptive names | The name of the function describes what it does. |
|||| Function arguments | The function takes one argument, the object to be validated. |
|||| DRY | The function does repeat itself, see Small! (Smaller!) |
| - | - | - | - | - | - |
| ColorSettings.constructor | 17 | 43 | Small! (Smaller!) | This was bad... Extracting the validation helped. And semi-preparing it to use an argument-object improved it further. I have not taken the step to fully convert it to take an argument-object... frankly, A: I don't want to rewrite the test suits and B: This is behind the public interface. So yeah... it will do.  |
|||| Do one thing | The constructor also did validates, this was extracted. |
|||| Function arguments | The constructor takes a whooping 7 arguments, this should be rewritten to take an argument object. |
| - | - | - | - | - | - |
| validateFontSettings(fontSettings) | 13 | 65 | Small! (Smaller!) | The function was a bit long, but not overly complex. As a validator method it was just several if statements. However I saw the possibility of breaking out 'is' methods isOfSameType(object, object) isObject, isString etc that shortened it quite a bit. |

### Slutsats kring funktioner/metoder

I huvudsak är det mina valideringsfunktioner som är för långa... smarta isThisThatOrTheOther metoder kan dra ner längden radikalt och minskar upprepad kod.  
ColorSettings constructorn behöver skrivas om till att ta ett argument objekt.  
drawXAxisLabelsAndVerticalLines kommer att få ytterligare försök att bli nedbruten.

### Reflektion över kapitel 3

get this as pdf [here](./.kodkvalitetskrav/L2%20-%20reflection%20chapter%203.pdf)

In reading chapter three ’Functions’ with ‘Meaningful names’ fresh in mind, indeed, Robert can’t help but retrace a few points,  
the emphasis on distinctiveness and focus in the chapter reminds me of a saying by Plato...  
“Each man is capable of doing one thing well. If he attempts several, he will fail to achieve distinction in any”.  
Both chapters two and three strongly emphasise that functions should be distinct, both in name and purpose.  
Ironically after the extensive verbal flow of words about names in the previous chapter,  
the main focus of ‘functions’ is that functions and methods should be as concise as possible, ideally, one row, but less than twenty.

Indeed the school of singular purposes almost come across as Zen-Buddhistic,  
“when hungry eat, when tired sleep”.  
You might be able to sum up chapter three in the proverbial Latin motto “Age quod agis” (Act then you act).  
Meaning whatever you are doing, let that be your entire focus.

If you follow this to the extreme, all the other rules of the chapter really become redundant.  
A fully focused method will only do one thing,  
it will not have side effects,  
it will by its nature take the minimum of arguments,  
and the very thought of doing and answering in the same method becomes unthinkable.

While I take few exceptions to the ideals portrayed in ‘Functions’,  
I do think that there is some undefined upper limit to how many abstractions levels is reasonable to delve into to go from the highest function to the actual implementation.  
It risks becoming akin to Alice's rabbit hole,  
a frustrating dive into the code through minutely coarser levels of abstraction,  
looking for the final function where the work is conducted.

Indeed any quick google search on ‘critique clean code’ will tell you that there is an active and lively debate in the coding community on the proper level of abstraction,  
the dangers of losing understanding through over abstraction,  
and the performance hit from doing X levels of needless function calls.

The ideal balance point I believe is down to a combination of experience and personal preference.

My inclination is to also not agree wholeheartedly with the ideal of zero arguments.  
The objection I make is, provided they are properly named, the arguments actually clarify what the function is working on or with,  
and having that being presented in a clear way on the call line, rather than having to go into the function and look what ‘this.propertie’s are being accessed, improves understanding.

In conclusion, these rules have many good points and following them will improve readability… with the risk of diminishing understandability if taken too far.

## Reflektion över våra erfarenheter

### Instruktion

Skriv en kortare reflektion (halv sida 12pt) där du beskriver dina erfarenheter från din egen kodkvalitet. Använd begrepp från boken. 

### Reflektion

get this as pdf [here](./.kodkvalitetskrav/L2%20-%20reflection%20reflection.pdf)

Robert describes his initial code-writing as long and complicated.  
I resonate with this, and call this phase ‘Brutecoding’,  
essentially a blunt, inelegant draft focused on solely functionality.  
This assignment was similarly approached in a method of increment refinement.  
Robert and I agree on a lot of things in terms of function writing, though I believe he over-emphasise small.  
My aim is for functions to transparently convey their purpose, with a mindful approach to minimizing nested conditions.  
Adopting an 'abort early' mindset has proven effective.

Robert’s ideal is that code should behave exactly as expected,  
“you know you’re working on clean code when a function does exactly what you expect of it”. However, he also acknowledges that this rarely occurs.  
I agree with the ideal, but want to highlight the potential pitfall:  
with increasing levels of abstraction, there's a risk of misinterpreting functionality,  
and consequently having to dig deeper before you find out.

In pursuit of that ideal I have during the assignment identified that I can be better at writing small check functions,  
isString as an example, to make, validators smaller,  
and that I should also lowering my threshold for when a painted type should become a class.

When it comes to naming, I personally consider my names to be fairly on par.  
I like my code to make sense even a week from now.  
My major bane in Martins naming rule, and that is the “Don’t be cute” (as I renamed it “Don’t be a smartass”) principle.  
Names I consider “too obvious to be needed” tend to fall for this.  
A prime example is the nonMagicZero previously mentioned in my identifier table,  
it, to be polite, is too witty.

Like Robert, I value automated test suites.  
During this coding assignment, when my grasp on the necessary class characteristics was sufficient,  
I found myself leaning towards test-driven development.

Retrospectively and in conclusion,  
further time spent on my initial analysis would have allowed me to reach this  
more productive point of test-driven development sooner.
