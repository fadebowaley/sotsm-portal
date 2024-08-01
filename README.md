# FaithMetrics 

## Introduction

FaithMetrics Suite is a comprehensive church management and analytics platform designed to facilitate the efficient administration of church operations, spiritual growth tracking, and demographic analytics. The application integrates various modules to provide a seamless experience for managing church data, personnel records, and spiritual milestones, all within a single, user-friendly interface.

## Key Features

- **Personnel Management**: Manage user profiles including church employees, pastors, and volunteers with detailed personal and professional information.
- **Church Administration**: Oversee multiple church locations with data on establishment, property status, and operational metrics.
- **Spiritual Growth Tracking**: Monitor and report on the spiritual development of the congregation, including key milestones like baptism and ordinations.
- **Demographic Analytics**: Access detailed reports on church demographics, attendance figures, and engagement in church activities.
- **Departmental Oversight**: Manage department-specific information and assignments, ensuring clarity and efficiency in church operations.
- **Household Management**: Keep records of church members' households, facilitating tailored pastoral care and community support.
- **Event Reporting**: Generate and review reports for weekly and monthly church activities, providing insights into church growth and engagement.

## Technologies

FaithMetrics Suite is built using the following technologies:
- **Node.js**: Provides the runtime environment for the backend.
- **Express**: Facilitates the server-side framework for routing and middleware.
- **Sequelize**: Serves as the ORM for relational database management.
- **MySQL/PostgreSQL**: Stores all application data securely and efficiently.
- **EJS**: Handles template rendering for server-side views.

# Application Data Model Overview

## Model Descriptions

### User
- Central to most models, relating to personal, professional, and church-related data.
- Directly related to `CareerMinistry`, `Household`, `Department`, `SpiritualProfile`, and indirectly to other models through these associations.

### CareerMinistry
- Stores career-specific information for users who have roles within the ministry, such as their assignment, job title, and employment history.
- Belongs to `User`.

### Church
- Represents a church location including details like address, establishment date, and operational codes.
- Central to many reports and statistics.
- Has many `MonthlyReport`, `VitalStatistics`, `Statistics`.
- Belongs to `User`.

### Department
- Details about the departmental assignment of users, including location and job specifics.
- Belongs to `User`.

### FaithTable
- Contains spiritual growth tracking for households, like levels, labels, and codes.
- Belongs to `Household`.

### Household
- Tracks information about user households, including status and identification codes.
- Has one `FaithTable`.
- Belongs to `User`.

### MonthlyReport
- Reports on weekly activities and demographic data of church attendees.
- Belongs to `Church`.

### SpiritualProfile
- Details the spiritual milestones and ordinations of a user.
- Belongs to `User`.

### Statistics
- Provides a statistical overview of church demographics and worker distribution.
- Belongs to `Church`.

### UserData
- Seems to be an extension of the `User` model, possibly intended for storing mutable or authentication-related user data.
- Has one `User`.

### VitalStatistics
- Tracks essential demographic statistics for a church, similar to but distinct from `Statistics` in granularity or use case.
- Belongs to `Church`.

## Model Relationships Sketch


                                 +----------------+
                                 |     User       |
                                 +----------------+
                                /|\              /|\
                               / | \            / | \
                              /  |  \          /  |  \
                             /   |   \        /   |   \
                            /    |    \      /    |    \
                           /     |     \    /     |     \
                          v      v      v  v      v      v
       +-------------------+  +----------+ +-------------+ +--------------+
       |  CareerMinistry   |  | Household | | Department  | | Spiritual    |
       +-------------------+  +----------+ +-------------+ | Profile      |
             |                      |          |           +--------------+
             |                      |          |                 |
             |                      |          |                 |
             |                      v          v                 |
             |              +-----------+  +-----------+        |
             |              | FaithTable |  |   Church  |        |
             |              +-----------+  +-----------+        |
             |                      |          /|\               |
             |                      |           |                |
             |                      |           |                |
             |                      |           |                |
             |                      |           |                |
             v                      v           v                v
+-----------------------+ +-----------------------+ +----------------------+
|      UserData         | |     MonthlyReport     | |     VitalStatistics  |
+-----------------------+ +-----------------------+ +----------------------+
                           |     Statistics      |
                           +---------------------+




## Installation

To get FaithMetrics Suite up and running on your local machine for development and testing purposes, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourgithubusername/FaithMetricsSuite.git


cd FaithMetricsSuite


npm install

npm start


## License
1. This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

Thanks to all the contributors who have invested their time and effort into making FaithMetrics Suite a robust and reliable church management solution.

## Key Observations and Recommendations

- **Data Redundancy**: Consider merging `Statistics` and `VitalStatistics` if they serve overlapping purposes.
- **Model Naming**: Ensure consistency in naming conventions, e.g., `UserData` vs. `User`. If `UserData` is meant for sensitive data, consider a more indicative name.
- **Role Definitions**: Ensure clear role definitions for each model to avoid overlap and confusion, especially where similar data points are collected across multiple models.

