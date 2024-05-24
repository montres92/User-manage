import React, { useEffect, useState } from "react";
import type { PopconfirmProps } from "antd";
import { Space, Table, Button, message, Popconfirm } from "antd";
import { supabase } from "../App.tsx";

const { Column, ColumnGroup } = Table;

const cancel: PopconfirmProps["onCancel"] = (e) => {
  console.log(e);
  message.error("Cancel");
};

interface DataType {
  key: React.Key;
  first_name: string;
  last_name: string;
  email: string;
}

function TableUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  async function getUsers() {
    const data = await supabase.from("users").select("*");
    setUsers(data.data);
  }

  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);

    message.success("Deleted");
  };

  return (
    <Table dataSource={users}>
      <Column title="ID" dataIndex="id" key="key" />

      <ColumnGroup title="Name">
        <Column title="First Name" dataIndex="first_name" key="firstName" />
        <Column title="Last Name" dataIndex="last_name" key="lastName" />
      </ColumnGroup>
      <Column title="Email" dataIndex="email" key="email" />

      <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => (
          <Space size="middle">
            <Button
              onClick={() => {
                console.log(record);
              }}
            >
              Edit {record.last_name}
            </Button>
            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                onClick={async () => {
                  console.log(record);
                  const { error } = await supabase
                    .from("users")
                    .delete()
                    .eq("id", `${record.id}`);
                }}
              >
                Delete
              </Button>
            </Popconfirm>
          </Space>
        )}
      />
    </Table>
  );
}
export default TableUser;
