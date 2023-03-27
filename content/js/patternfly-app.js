import React, { useState } from "react";
import { Table, TableHeader, TableBody, sortable, SortByDirection } from "@patternfly/react-table";
import { Checkbox, Dropdown, DropdownItem, DropdownToggle, DropdownSeparator, DropdownPosition } from "@patternfly/react-core";

function App() {
  // state for the dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState("");

  // state for the table
  const [selectedItems, setSelectedItems] = useState([]);

  // data for the table
  const columns = [
    { title: <Checkbox aria-label="Select all" isChecked={selectedItems.length > 0} onChange={handleSelectAll} />, transforms: [sortable] },
    { title: "Component Name", transforms: [sortable] },
    { title: "Component Kind", transforms: [sortable] },
    { title: "Component Status", transforms: [sortable] }
  ];

  const rows = [
    { id: 1, cells: [<Checkbox aria-label="Select item 1" isChecked={selectedItems.includes(1)} onChange={() => handleSelect(1)} />, "Component A", "Deployment", "Ready"], selected: selectedItems.includes(1) },
    { id: 2, cells: [<Checkbox aria-label="Select item 2" isChecked={selectedItems.includes(2)} onChange={() => handleSelect(2)} />, "Component B", "Pod", "Not ready"], selected: selectedItems.includes(2) },
    { id: 3, cells: [<Checkbox aria-label="Select item 3" isChecked={selectedItems.includes(3)} onChange={() => handleSelect(3)} />, "Component C", "Service", "Ready"], selected: selectedItems.includes(3) }
  ];

  // handler function for the "Select all" checkbox
  function handleSelectAll(event, isChecked) {
    if (isChecked) {
      setSelectedItems(rows.map(row => row.id));
    } else {
      setSelectedItems([]);
    }
  }

  // handler function for a checkbox in a row
  function handleSelect(itemId) {
    setSelectedItems(selectedItems.includes(itemId) ? selectedItems.filter(id => id !== itemId) : [...selectedItems, itemId]);
  }

  // handler function for the dropdown
  function handleActionSelect(event, action) {
    setAction(action);
  }

  // handler function for the "Apply" button in the dropdown
  function handleApply() {
    // apply the selected action to the selected items
    console.log(`Applying "${action}" to items ${selectedItems.join(", ")}`);

    // clear the selected items and action
    setSelectedItems([]);
    setAction("");
  }

  // render the dropdown
  const dropdownItems = [
    <DropdownItem key="action-1" onClick={event => handleActionSelect(event, "Action 1")}>Action 1</DropdownItem>,
    <DropdownItem key="action-2" onClick={event => handleActionSelect(event, "Action 2")}>Action 2</DropdownItem>,
    <DropdownSeparator key="separator" />,
    <DropdownItem key="action-3" onClick={event => handleActionSelect(event, "Action 3")}>Action 3</DropdownItem>
  ];

  const dropdownToggle = <DropdownToggle onToggle={setIsOpen}>{action || "Select an action"}</DropdownToggle>;

  return (
    <React.Fragment>
      <Dropdown
        onSelect={handleApply}
        toggle={dropdownToggle}
        isOpen={isOpen}
        dropdownItems={dropdownItems}
        position={DropdownPosition.right}
      />
      <Table caption="Components">
        <TableHeader cells={columns} />
        <TableBody rows={rows} />
      </Table>
    </React.Fragment>
  )
};
