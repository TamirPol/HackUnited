# idontwannagetstabbed.com

## Inspiration
The idea for this project was born from a shared concern for personal safety during nighttime commutes. Many of us, including one of our team members, have experienced the anxiety of walking home alone, especially in unfamiliar areas or neighborhoods with higher crime rates. To alleviate this pressure, we created a solution that empowers users to make informed decisions about their routes, prioritizing both safety and efficiency.

## What It Does
The app helps users find the safest and most efficient route to their destination. By integrating real-time data, such as crime statistics from the Toronto Police (including crime type, date, and location) and user-generated safety reports, the app analyzes and suggests optimal paths to minimize exposure to potentially dangerous areas. Users can:
- View the safest and most efficient routes.
- Report incidents to aid others.
- Quickly contact trusted friends or family in emergencies.

## Features
- **Safe Route Planning**: Provides routes optimized for safety, efficiency, or a balance of both.
- **Crime Data Integration**: Analyzes over 40,000 crime reports from the Greater Toronto Area (GTA).
- **User Reports**: Allows users to report incidents dynamically, enriching real-time data.
- **Emergency Contact**: Enables users to send alerts to trusted individuals in case of emergencies.
- **Interactive Map**: Displays routes and safety metrics in a responsive, easy-to-navigate interface.

## How We Built It

### Backend
- **Technologies**: Python, OpenRouteService API, MongoDB.
- **Route Optimization**: Generated routes using Python's `ThreadPoolExecutor` to improve performance with multithreading. Routes are evaluated for safety, speed, and efficiency.
- **Database**: Stored crime data in MongoDB using a geospatial index (2dsphere) for fast querying and route analysis.

### Frontend
- **Technologies**: React Native.
- **Features**: Built a mobile interface with a responsive map for route visualization, safety metrics, and reporting capabilities. Designed for cross-platform usability, prioritizing user experience.

### Data Integration
- Combined static crime data with dynamic user locations using public APIs for accurate, real-time analysis.

### Mapping
- Leveraged React Native's mapping tools to visualize routes and overlay safety information, providing an interactive user experience.

### Collaboration
- Used GitHub for version control, enabling efficient teamwork, conflict resolution, and task management.

## Challenges
1. **Route Generation**: Midpoints for unique routes sometimes fell off-road. We implemented a snapping algorithm to align points to the nearest road.
2. **Crime Data Integration**: Adapting large datasets to fit our routing architecture required extensive optimization.
3. **Frontend Setup**: Configuring the React Native environment was time-consuming and challenging, especially for mapping and permissions.
4. **Performance Optimization**: Reduced time complexity for crime data analysis from O(n*m) to O(log(n)*m) using geospatial indexing.

## Accomplishments
- Successfully rendered routes on the map.
- Optimized crime data processing for faster route analysis.
- Implemented a system to evaluate route safety based on hundreds of midpoints and tens of thousands of crime reports.

## What We Learned
- **Collaboration**: Clear communication and task division are crucial, especially under time constraints.
- **Technical Skills**: Gained experience in geospatial indexing, real-time data integration, and multithreading.
- **User-Centric Design**: Prioritized empathy in design to address user safety concerns effectively.

## What's Next
1. **Expanded Data Sources**: Integrate more regions and additional safety metrics, such as traffic patterns and CCTV coverage.
2. **Machine Learning**: Implement predictive analytics to provide proactive safety alerts based on emerging trends.
3. **Community Features**: Introduce user-driven real-time safety updates, such as poorly lit areas or recent incidents.
4. **Cross-Platform Support**: Extend support to Android while maintaining platform-specific optimizations.
5. **Accessibility**: Improve app usability for diverse user groups.

## Developer Information
- **Developers**: Tamir Polyakov, Branavan Jegatheeswaran, Adit Rahman, Ilyas Hirsi.
- **Goals**: To create a practical, user-friendly tool that enhances personal safety during commutes by leveraging real-time data and efficient algorithms.

## Conclusion
"I Don't Want to Get Stabbed" demonstrates how technology can address real-world safety concerns. From processing crime data to rendering safe, walkable routes, the app provides users with an empowering tool for navigating safely. We are proud of our achievements and excited to enhance the app with advanced features, broader data coverage, and cross-platform compatibility to continue making a positive impact.
