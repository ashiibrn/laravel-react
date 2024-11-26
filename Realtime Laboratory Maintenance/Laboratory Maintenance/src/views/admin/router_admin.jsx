import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomepageAdmin from './homepage_admin.jsx';
import Table_Admin from './table.jsx';
import Table_Edit from './table_form.jsx';

export function AdminRoutes() {
    return (
        <Routes>
            <Route path="homepage" element={<HomepageAdmin />} />
            <Route path="table" element={<Table_Admin />} />
            <Route path="users/edit/:id" element={<Table_Edit />} /> {/* Use dynamic id for editing users */}
            {/* Default route for admin redirects to homepage */}
            <Route path="/" element={<Navigate to="homepage" />} />
            {/* Fallback route for unmatched paths */}
            <Route path="*" element={<Navigate to="homepage" />} />
        </Routes>
    );
}

export default AdminRoutes;
