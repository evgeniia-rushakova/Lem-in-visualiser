<h1>Lem-in visualiser</h1>

<i>Lem-in - учебный проект школы 42. Суть проекта состоит в том, чтобы имплементировать алгоритм нахождения кратчайшего пути. </i>
_________________________
<br>
<a href="https://evgeniia-rushakova.github.io/Lem-in-visualiser/">Демо-версия на Github-pages</a>
<br>
<p>Входные данные программы представляют собой тектовый файл с количеством муравьев, которые должны попасть из начальной комнаты в конечную, координат комнат и связей между ними. После обработки входных данных к ним приписывается расчитанный кратчайший путь. Пример выходных данных можно увидеть ниже: </p>
<p>
10<br/>
##start<br/>
A 5 1<br/>
B 6 7<br/>
C 4 8<br/>
D 10 1<br/>
E 3 2<br/>
F 8 7<br/>
G 5 3<br/>
##end<br/>
H 4 5<br/>
A-D<br/>
D-E<br/>
E-G<br/>
F-H<br/>
G-H<br/>
<br/>
L1-D<br/>
L1-E L2-D<br/>
L1-G L2-E L3-D<br/>
L1-H L2-G L3-E L4-D<br/>
L2-H L3-G L4-E L5-D<br/>
L3-H L4-G L5-E L6-D<br/>
L4-H L5-G L6-E L7-D<br/>
L5-H L6-G L7-E L8-D<br/>
L6-H L7-G L8-E L9-D<br/>
L7-H L8-G L9-E L10-D<br/>
L8-H L9-G L10-E<br/>
L9-H L10-G<br/>
L10-H<br/>
</p>
<h4>Использованные инструменты:</h4>
<ul>
<li>C - парсинг входных файлов, алгоритм нахождения пути</li>
<li>Node.js - легкий веб-сервер для считывания файла и открытия в браузере</li>
<li>Javascript - расчеты для визуализации</li>
<li>SVG - отрисовка муравьев и комнат</li>
<li>Anime.js - работа с анимацией муравьев</li>
</ul>
<h3>Чтобы воспользоваться визуализатором:</h3>
<h5>установка:</h5>
1.поставить Node.js <b>10 версии и выше</b>(один раз)<br>
2.зайти в папку <i>lemin-visual</i> и в терминале набрать <i>npm install</i> (один раз)<br>
<h5>использвание</h5>
3.Перейти в папку <i>lemin-visual</i>.Чтобы запустить визуализатор набрать в консоли <i>"npm run vis <имя карты>"</i><br>
________________________________

<img src="https://github.com/evgeniia-rushakova/super-funicular-lemin/blob/master/lemin-visual/Screen%20recording.gif" alt="demo">
