"use client";
import React, { useState } from "react";
import { Layout, Button, Select, Modal, Form, InputNumber, Input } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

const { Header } = Layout;
const { Option } = Select;

const networks = [
  { label: "Polkadot", value: "polkadot", color: "#E6007A" },
  { label: "Kusama", value: "kusama", color: "#FFFFFF" },
  { label: "Moonbeam", value: "moonbeam", color: "#53CBC9" },
];

function Navbar() {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("Polkadot");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const creatememetoken = async (values: {
    symbol: string;
    logoUrl: string;
    totalSupply: number;
    mintLimit: number;
    title: string;
    content: string;
  }) => {
    // const { data, error } = await nextApiClientFetch<any>("/api/createCoin", {
    //   name: values.symbol,
    //   logoImage: values.logoUrl,
    //   totalSupply: values.totalSupply,
    //   limit: values.mintLimit,
    //   title: values.title,
    //   content: values.content,
    //   proposer: "your_wallet_address",
    // });
    // if (error) {
    //   console.error("Error Creating Meme Token:", error);
    //   return null;
    // }
    // return data;
  };

  const handleSubmit = (values: {
    symbol: string;
    logoUrl: string;
    totalSupply: number;
    title: string;
    content: string;
    mintLimit: number;
  }) => {
    console.log("Form values:", values);
    creatememetoken(values);
    handleCloseModal();
  };

  const handleOpenModal = () => {
    console.log("Open modal");
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleNetworkChange = (value: string) => {
    setSelectedNetwork(value);
  };

  return (
    <div>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#001529",
          padding: "0 20px",
        }}
      >
        <Link href="/">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              color: "#fff",
              margin: 0,
              fontSize: "24px",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Memecoin Generator
          </motion.h1>
        </Link>
        <div
          className="flex gap-3"
          style={{ display: "flex", alignItems: "center" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Select
              placeholder="Select Network"
              defaultValue={selectedNetwork}
              style={{
                width: 160,
                marginRight: 20,
                border: "1px solid #001529",
                borderRadius: "5px",
                color: "#fff",
              }}
              onChange={handleNetworkChange}
              dropdownStyle={{
                backgroundColor: "#001529",
                color: "#fff",
              }}
            >
              {networks.map((network) => (
                <Option
                  key={network.value}
                  value={network.value}
                  style={{
                    color: network.color,
                    fontWeight: "bold",
                  }}
                >
                  {network.label}
                </Option>
              ))}
            </Select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button
              type="default"
              style={{
                background: "#53CBC9",
                color: "#fff",
                borderRadius: "5px",
                border: "none",
              }}
              onClick={handleOpenModal}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#45b1b0")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#53CBC9")
              }
            >
              Create Memecoin
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <ConnectWallet />
          </motion.div>
        </div>
      </Header>
      <Modal
        title="Create MEME Token"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        className="-mt-10"
        footer={null}
      >
        <div
          style={{
            padding: "10px 10px",
          }}
        >
          <div>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              style={{ textAlign: "left" }}
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter the title" }]}
              >
                <Input
                  placeholder="e.g., MEME Token"
                  style={{
                    height: "45px",
                    borderRadius: "8px",
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Content"
                name="content"
                rules={[
                  { required: true, message: "Please enter the content" },
                ]}
              >
                <Input
                  placeholder="e.g., MEME Token Description"
                  style={{
                    height: "45px",
                    borderRadius: "8px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Token Symbol"
                name="symbol"
                rules={[
                  { required: true, message: "Please enter the token symbol" },
                ]}
              >
                <Input
                  placeholder="e.g., DOT, KSM"
                  style={{
                    height: "45px",
                    borderRadius: "8px",
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Token Logo URL"
                name="logoUrl"
                rules={[
                  { required: true, message: "Please enter the logo URL" },
                ]}
              >
                <Input
                  placeholder="e.g., https://example.com/logo.png"
                  style={{
                    height: "45px",
                    borderRadius: "8px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Total Supply"
                name="totalSupply"
                rules={[
                  { required: true, message: "Please enter the total supply" },
                ]}
              >
                <InputNumber
                  placeholder="e.g., 1000000"
                  style={{
                    width: "100%",
                    height: "45px",
                    borderRadius: "8px",
                  }}
                  min={1}
                />
              </Form.Item>

              <Form.Item
                label="Limit per Mint"
                name="mintLimit"
                rules={[
                  { required: true, message: "Please enter the mint limit" },
                ]}
              >
                <InputNumber
                  placeholder="e.g., 100"
                  style={{
                    width: "100%",
                    height: "45px",
                    borderRadius: "8px",
                  }}
                  min={1}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    height: "50px",
                    fontSize: "16px",
                    fontWeight: "500",
                    backgroundColor: "#1890ff",
                    borderColor: "#1890ff",
                    borderRadius: "8px",
                  }}
                >
                  Create Token
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Navbar;
