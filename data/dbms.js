const dbms = [
    {
        question: 'What is a primary key?',
        solution: 'A primary key is a field in a table which uniquely identifies each row/record in that table.'
    },
    {
        question: 'Explain ACID properties.',
        solution: 'ACID stands for Atomicity, Consistency, Isolation, Durability. These properties ensure reliable transactions in a database.'
    },
    {
        question: 'What is normalization?',
        solution: 'Normalization is the process of organizing data to reduce redundancy and improve data integrity.'
    },
    {
        question: 'What is a foreign key?',
        solution: 'A foreign key is a field (or fields) in one table that uniquely identifies a row of another table. It creates a link between the two tables.'
    },
    {
        question: 'What is a database index?',
        solution: 'A database index is a data structure that improves the speed of data retrieval operations on a database table at the cost of additional writes and storage space.'
    },
    {
        question: 'What is a transaction?',
        solution: 'A transaction is a sequence of one or more SQL operations that are treated as a unit. They must all be completed successfully or none at all, maintaining the databases integrity.'
    },
    {
        question: 'What is a stored procedure?',
        solution: 'A stored procedure is a set of SQL statements that can be stored and reused in the database. They are used to encapsulate and execute business logic within the database.'
    },
    {
        question: 'What is denormalization?',
        solution: 'Denormalization is the process of adding redundancy to a database to improve read performance, often by combining tables or adding derived columns.'
    }
];

export default dbms;


