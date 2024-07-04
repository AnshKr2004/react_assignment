import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import { Department } from '../types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const departments: Department[] = [
  {
    id: 1,
    name: 'Department 1',
    subDepartments: [
      { id: 2, name: 'Sub Department 1-1', subDepartments: [] },
      { id: 3, name: 'Sub Department 1-2', subDepartments: [] }
    ]
  },
  {
    id: 4,
    name: 'Department 2',
    subDepartments: [
      { id: 5, name: 'Sub Department 2-1', subDepartments: [] },
      { id: 6, name: 'Sub Department 2-2', subDepartments: [] }
    ]
  }
];

const DepartmentTree: React.FC = () => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setExpanded(expanded.includes(id) ? expanded.filter(e => e !== id) : [...expanded, id]);
  };

  const handleSelect = (id: number, subIds: number[]) => {
    const isSelected = selected.includes(id);
    const newSelected = isSelected
      ? selected.filter(e => e !== id && !subIds.includes(e))
      : [...selected, id, ...subIds.filter(e => !selected.includes(e))];
    setSelected(newSelected);
  };

  const renderDepartments = (departments: Department[], parentSelected = false) => {
    return departments.map(department => {
      const isExpanded = expanded.includes(department.id);
      const isSelected = selected.includes(department.id);
      const allSubSelected = department.subDepartments.every(sub => selected.includes(sub.id));

      return (
        <React.Fragment key={department.id}>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={isSelected || (parentSelected && !isSelected)}
                indeterminate={!isSelected && allSubSelected && !parentSelected}
                onClick={() => handleSelect(department.id, department.subDepartments.map(sub => sub.id))}
              />
            </ListItemIcon>
            <ListItemText primary={department.name} />
            {department.subDepartments.length > 0 && (
              <IconButton onClick={() => handleToggle(department.id)}>
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </ListItem>
          {isExpanded && (
            <List component="div" disablePadding>
              {renderDepartments(department.subDepartments, isSelected)}
            </List>
          )}
        </React.Fragment>
      );
    });
  };

  return <List>{renderDepartments(departments)}</List>;
};

export default DepartmentTree;
