# Frontend - Organization and User Management

React frontend application for managing organizations and users, built with Vite and styled with TailwindCSS.

## 🏗️ Architecture

The frontend follows a component-based architecture:

- **Pages**: Main application pages/routes
- **Components**: Reusable UI components organized by feature
- **Services**: API communication layer
- **Assets**: Static files and images
- **Routing**: React Router for navigation

## 📁 Directory Structure

```
frontend/Organization-Users-Management/
├── src/
│   ├── assets/                    # Static assets (images, icons)
│   ├── components/
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.jsx        # Application header
│   │   │   ├── Layout.jsx        # Main layout wrapper
│   │   │   └── Sidebar.jsx       # Sidebar navigation
│   │   ├── organizations/        # Organization-related components
│   │   │   ├── AddOrganizationForm.jsx
│   │   │   ├── ChangeStatusModal.jsx
│   │   │   ├── OrganizationTable.jsx
│   │   │   ├── OrganizationRow.jsx
│   │   │   ├── ProfileHeader.jsx
│   │   │   └── ...
│   │   ├── users/                # User-related components
│   │   │   ├── UserForm.jsx
│   │   │   ├── UserList.jsx
│   │   │   └── UserRow.jsx
│   │   └── ui/                   # Reusable UI components
│   │       ├── Button.jsx
│   │       ├── InfoCard.jsx
│   │       ├── InputWithLabel.jsx
│   │       ├── Pagination.jsx
│   │       ├── PhoneInput.jsx
│   │       ├── RolePill.jsx
│   │       ├── SelectWithLabel.jsx
│   │       ├── SlideOver.jsx
│   │       ├── StatusPill.jsx
│   │       └── TabNavigation.jsx
│   ├── pages/                    # Page components
│   │   ├── ManageOrganizationsPage.jsx
│   │   └── OrganizationDetailsPage.jsx
│   ├── services/                 # API service functions
│   │   ├── api.js               # Axios configuration
│   │   ├── organizationService.js
│   │   └── userService.js
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Global styles
│   ├── index.css                # TailwindCSS imports
│   └── main.jsx                 # Application entry point
├── public/                      # Public assets
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # TailwindCSS configuration
└── README.md                    # This file
```

## 🛠️ Prerequisites

- Node.js 16+
- npm or yarn package manager

## ⚙️ Installation

1. **Navigate to frontend directory:**

   ```bash
   cd frontend/Organization-Users-Management
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

The application will be available at: http://localhost:5173

## 🚀 Available Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## 🧩 Components Overview

### Layout Components

- **Header**: Application header with navigation
- **Layout**: Main layout wrapper with consistent structure
- **Sidebar**: Navigation sidebar (if implemented)

### Organization Components

- **OrganizationTable**: Displays list of organizations with pagination
- **AddOrganizationForm**: Form for creating new organizations
- **ProfileHeader**: Organization profile header with logo and status
- **ChangeStatusModal**: Modal for changing organization status
- **OrganizationRow**: Individual organization row in table

### User Components

- **UserList**: List of users for an organization
- **UserForm**: Form for adding/editing users
- **UserRow**: Individual user row in list

### UI Components

- **Button**: Reusable button component
- **InfoCard**: Card component with title and edit functionality
- **InputWithLabel**: Input field with label
- **SelectWithLabel**: Select dropdown with label
- **PhoneInput**: Phone number input with validation
- **Pagination**: Pagination component for tables
- **SlideOver**: Slide-over modal component
- **StatusPill**: Status indicator pill
- **RolePill**: Role indicator pill
- **TabNavigation**: Tab navigation component

## 🔄 Application Flow

### Organizations Management

1. **List Organizations**: View all organizations in a paginated table
2. **Add Organization**: Use slide-over form to create new organization
3. **View Details**: Click on organization to view detailed information
4. **Edit Organization**: Modify organization details in editable form
5. **Upload Logo**: Upload organization logo via file input
6. **Change Status**: Activate/deactivate organizations
7. **Delete Organization**: Remove organization and associated users

### Users Management

1. **View Users**: See all users for a specific organization
2. **Add User**: Create new users with role assignment
3. **Edit User**: Update user information
4. **Delete User**: Remove users from organization

## 🎨 Styling

The application uses TailwindCSS for styling:

- **Utility-first approach**: Classes for rapid UI development
- **Responsive design**: Mobile-first responsive breakpoints
- **Custom components**: Consistent design system
- **Dark mode ready**: TailwindCSS dark mode support

### Key Design Patterns

- **Cards**: InfoCard component for sectioned content
- **Forms**: Consistent form styling with validation states
- **Tables**: Clean table design with hover states
- **Modals**: SlideOver and modal components for overlays
- **Status indicators**: Color-coded pills for status and roles

## 🔗 API Integration

### Service Layer

- **api.js**: Axios instance with base configuration
- **organizationService.js**: Organization CRUD operations
- **userService.js**: User CRUD operations

### API Endpoints Used

```javascript
// Organizations
GET / organizations / GET / organizations / { id };
POST / organizations / PUT / organizations / { id };
PUT / organizations / { id } / logo;
DELETE / organizations / { id };

// Users
GET / users / by - organization / { org_id };
POST / users / PUT / users / { id };
DELETE / users / { id };
```

## 🧭 Routing

The application uses React Router v7:

| Route                | Component                    | Description                    |
| -------------------- | ---------------------------- | ------------------------------ |
| `/`                  | Redirect to `/organizations` | Root redirect                  |
| `/organizations`     | ManageOrganizationsPage      | List all organizations         |
| `/organizations/:id` | OrganizationDetailsPage      | Organization details and users |

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-first approach**: Designed for mobile, enhanced for desktop
- **Breakpoint system**: sm, md, lg, xl breakpoints
- **Flexible layouts**: Grid and flexbox for adaptive layouts
- **Touch-friendly**: Appropriate touch targets for mobile

## 🔧 Configuration

### Vite Configuration

Located in `vite.config.js`:

- React plugin
- TailwindCSS integration
- Development server settings

### Environment Variables

Create `.env` file for environment-specific settings:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🧪 Testing

```bash
# Run tests (if implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` directory with optimized assets.

### Serve Production Build

```bash
npm run preview
```

### Deployment Options

- **Static hosting**: Netlify, Vercel, GitHub Pages
- **Server deployment**: Nginx, Apache with static file serving
- **Docker**: Containerized deployment

## 🔧 Development Guidelines

### Component Structure

```jsx
// Example component structure
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialState);

  const handleAction = () => {
    // Handle action
  };

  return <div className="component-classes">{/* Component JSX */}</div>;
};

export default MyComponent;
```

### Naming Conventions

- **Components**: PascalCase (MyComponent.jsx)
- **Files**: PascalCase for components, camelCase for utilities
- **CSS Classes**: kebab-case or Tailwind utilities
- **State variables**: camelCase
- **Functions**: camelCase

### State Management

- **Local state**: useState for component-specific state
- **Props drilling**: Pass data through component tree
- **Context**: For global state (if needed)

## 🔄 Future Enhancements

- [ ] State management (Redux/Zustand)
- [ ] Unit testing with Jest/React Testing Library
- [ ] E2E testing with Cypress/Playwright
- [ ] Error boundaries
- [ ] Loading states and skeletons
- [ ] Toast notifications
- [ ] Form validation library (Formik/React Hook Form)
- [ ] Internationalization (i18n)
- [ ] Theme customization
- [ ] Progressive Web App (PWA) features

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**

   - Ensure backend is running on correct port
   - Check CORS configuration
   - Verify API base URL in services

2. **Build Issues**

   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify TailwindCSS configuration

3. **Styling Issues**
   - Ensure TailwindCSS is properly configured
   - Check for conflicting CSS classes
   - Verify responsive breakpoints

## 📞 Support

For frontend-specific issues or questions, please refer to the main project README or open an issue.
