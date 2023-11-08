created by Viktor Kmin

AutoRia clone

Клієнт звернувся до нас з замовленням на сайт по продажу автомобілів.
У нього вже існує доволі велика клієнтська база і вже діючий сайт який написаний більше в 2010му році. Наразі клієнська база дуже сильно росте і він хоче зробити платформу, яка буде витримувати в десятки разів більше навантаження від того яке є зараз.
Ще одним нюансом платформи є те, що часто потрібно буде дописувати, переписувати і вимикати деякі елементи системи.
Система має бути максимально гнучка і піддаватись змінам.
Також кастомер почув, що АWS це дуже стильно, модно і класно. Тому хотів би, що б нова платформа була зєднана з AWS.

З задач які він нам поставив як першочергові це:

    1. Ролі.
    На старій платформі існує 4 ролі.
    * Покупець - це людина яка “гуляє” по платформі. Вона може зв'язатися з окремим продавцем або автосалоном що б домовитись про огляд авто, тест драйв і так далі.
    * Продавець (юзер) - це людина яка хоче продати авто
    * Менеджер - людина, яка веде платформу. Банить людей. Видаляє не валідні оголошення. перевіряє підозрілі оголошення і т.д. Такого юзера може створити лише Адміністратор
    * Адміністратор - Суперюзер який може все. Це роль буде мати лише замовник та його партнери.

!!! Клієнт заікнувся про автосалони. В майбутньому на платформу планується вихід не лише одиночних продавцій, а також автосалонів зі своїм менеджерами, адмінами, сейлами, механіками. Необхідно це врахувати при побудові архітектури.
!!! Технічний експерт запропонував зробити це через систему пермішинів

    2. Типи акаунтів
    На платформі буде 2 типи акаунтів. Базовий та преміум. Базовий аккаунт буде у всіх продавців за замовчуванням. Преміум акаунт потрібно буде купувати за гроші
    Преміум аккаунт буде давати можливість переглядати статистику по оголошеннях. Середню ціну на таку авто по ринку та кількість переглядів оголошенн.

    3. Основні можливості платформи
    * Створення оголошення по продажі авто.
    Зареєстрований продавець може виставити своє на продаж. Якщо у  продавця аккаунт типу “Базовий”, то він може викласти лише одне авто на продаж. Якщо тип преміум, то кількість авто не обмеження.

При виборі марки авто має бути випадайка з усіма марками. Якщо якої марки немає у списку, то продавець може повідомити адміністрацію про те, що даної марки не вистачає.

Той самий флов з моделями авто.
BMW - марка
X5 - модель

Daewoo - марка
Lanos - модель

Клієнт може створити цінник в таких валютах USD, EUR, UAH. Ціна вказується лише в одній з валют. Решта валют вираховується по курсу приватбанку. Ціни оновлюються раз в день. Обов'язково вказувати по якому курсу ми робили підрахунок, та яку ціну вказував юзер при викладенні оголошення.
Кожне оголошення проходить перевірку на нецензурну лексику автоматично.
Якщо платформа не знайшла підозрілої лексики, то воно переходить в статус активного і попадає в на платформу. Якщо платформа знаходить не відповідні слова, то система пропонує редагувати оголошення. Продавець може редагувати оголошення лише 3 рази. Якщо за 3 рази оголошення не проходить, то воно попадає в статус не активного. При цьому буде надіслано лист для менеджера для перевірки.

    4. Інформація про оголошення
    Платформа не надає інформації по оголошенню для продавця з аккаунтом “Базовий”. Якщо у продавця акаунт типу “Преміум”, то платформа надає йому наступні дані:
    * кількість переглядів оголошення
    * кількість переглядів за день, тиждень, місяць
    * Середню ціну на авто по регіону продажу авто.

Наприклад якщо авто продається у Києві, то буде середня ціна авто по Києву.
Якщо у Львівській області, то середня ціна буде по Львівській області \* середня ціна авто по цілій Україні
