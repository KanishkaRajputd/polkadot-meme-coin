import Navbar from "@/Components/Navbar";
import { Layout, Table } from "antd";
import { motion } from "framer-motion";

const { Content } = Layout;
const columns = [
  {
    title: "Memecoin Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
  },
  {
    title: "Market Cap",
    dataIndex: "marketCap",
    key: "marketCap",
  },
];

const dataSource = [
  {
    key: "1",
    name: "Shiba Inu",
    symbol: "SHIB",
    marketCap: "$5.8B",
  },
  {
    key: "2",
    name: "Dogecoin",
    symbol: "DOGE",
    marketCap: "$8.2B",
  },
];

export default function Home() {
  return (
    <>
      <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
        <Navbar />
        <Content
          style={{
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: "32px", fontWeight: "bold" }}
          >
            Top Memecoins
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ width: "100%", maxWidth: "800px" }}
          >
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "table-row-light" : "table-row-dark"
              }
              style={{
                width: "100%",
                backgroundColor: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </motion.div>
        </Content>

        <style jsx>{`
          .table-row-light {
            background-color: #f9f9f9;
          }
          .table-row-dark {
            background-color: #e0e0e0;
          }
          .ant-table-tbody > tr:hover {
            background-color: #d3d3d3;
          }
        `}</style>
      </Layout>
    </>
  );
}
