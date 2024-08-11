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
    },
    {
        question: 'What is RDBMS ? Properties.. ?',
        solution: "A Relational Database Management system (RDBMS) is a database management system that is based on the relational model. It has the following major components: Table, Record/Tuple/Row, Field, and Column/Attribute. Examples of the most popular RDBMS are MYSQL, Oracle, IBM DB2, and Microsoft SQL Server databases. Relational databases have the following properties:Values are atomic.All of the values in a column have the same data type.Each row is unique.The sequence of columns is insignificant.The sequence of rows is insignificant.Each column has a unique name."
    },
    {
        question: 'Types of database languages ',
        solution: 'Data Definition Language: DDL stands for Data Definition Language. It is used to define database structure or pattern.Data Manipulation Language: DML stands for Data Manipulation Language. It is used for accessing and manipulating data in a database. It handles user requests.Data Control Language: DCL stands for Data Control Language. It is used to retrieve the stored or saved data.Transaction Control Language: TCL is used to run the changes made by the DML statement. TCL can be grouped into a logical transaction.',
    },
    {
        question: 'ACID properties (VVVVV IMP)',
        solution: 'To ensure the consistency of the database, certain properties are followed by all the transactions occurring in the system. These properties are called ACID Properties of a transaction. Atomicity Consistency Isolation Durability',
    },
    {
        question: 'Difference between vertical and horizontal scaling',
        solution: 'Scaling alters the size of a system. In the scaling process, we either compress or expand the system to meet the expected needs. The scaling operation can be achieved by adding resources to meet the smaller expectation in the current system, or by adding a new system in the existing one, or both. Vertical scaling keeps your existing infrastructure but adds computing power. Your existing pool of code does not need to change — you simply need to run the same code on machines with better specs. By scaling up, you increase the capacity of a single machine and increase its throughput. Vertical scaling allows data to live on a single node, and scaling spreads the load through CPU and RAM resources for your machines. Horizontal scaling simply adds more instances of machines without first implementing improvements to existing specifications. By scaling out, you share the processing power and load balancing across multiple machines.',
    },
    {
        question: 'What is sharding ',
        solution: 'Sharding is a method of splitting and storing a single logical dataset in multiple databases. By distributing the data among multiple machines, a cluster of database systems can store larger dataset and handle additional requests. Sharding is necessary if a dataset is too large to be stored in a single database. Moreover, many sharding strategies allow additional machines to be added. Sharding allows a database cluster to scale along with its data and traffic growth.',
    },
    {
        question: 'Keys in DBMS',
        solution: 'A key is a set of attributes that can identify each tuple uniquely in the given relation. Types of Keys: Super Key - A superkey is a set of attributes that can identify each tuple uniquely in the given relation. A super key may consist of any number of attributes. Candidate Key - A set of minimal attribute(s) that can identify each tuple uniquely in the given relation is called a candidate key. Primary Key - A primary key is a candidate key that the database designer selects while designing the database. Primary Keys are unique and NOT NULL. Alternate Key - Candidate keys that are left unimplemented or unused after implementing the primary key are called alternate keys. Foreign Key - An attribute ‘X’ is called as a foreign key to some other attribute ‘Y’ when its values are dependent on the values of attribute ‘Y’. The relation in which attribute ‘Y’ is present is called the referenced relation. The relation in which attribute ‘X’ is present is called the referencing relation. Composite Key - A primary key composed of multiple attributes and not just a single attribute is called a composite key. Unique Key - It is unique for all the records of the table. Once assigned, its value cannot be changed i.e. it is non-updatable. It may have a NULL value.',
    },
    {
        question: 'Types of relationship ',
        solution: 'A relationship is defined as an association among several entities. Unary Relationship Set - Unary relationship set is a relationship set where only one entity set participates in a relationship set. Binary Relationship Set - Binary relationship set is a relationship set where two entity sets participate in a relationship set. Ternary Relationship Set - Ternary relationship set is a relationship set where three entity sets participate in a relationship set. N-ary Relationship Set - N-ary relationship set is a relationship set where ‘n’ entity sets participate in a relationship set.',
    },
    {
        question: 'Explain CAP theorem in simple terms ',
        solution: 'The CAP theorem states that in a distributed database system, you can only have two out of three guarantees: Consistency (every read gets the latest data), Availability (the system is always up and serving requests), and Partition Tolerance (the system continues to work despite network failures). You cant have all three at the same time.',
    }
];

export default dbms;


