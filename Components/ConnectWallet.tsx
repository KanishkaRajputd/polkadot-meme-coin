"use client";
import { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

export default function ConnectWallet() {
  const [account, setAccount] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccount, setSelectedAccount] =
    useState<InjectedAccountWithMeta | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedAccount = localStorage.getItem("selectedAccount");
    if (storedAccount) {
      setSelectedAccount(JSON.parse(storedAccount));
    }
  }, []);

  async function connectWallet() {
    try {
      const { web3Enable, web3Accounts } = await import(
        "@polkadot/extension-dapp"
      );
      const extensions = await web3Enable("Polki");

      if (!extensions.length) {
        message.error(
          "No extension found. Please install Polkadot.js extension."
        );
        return;
      }

      const allAccounts = await web3Accounts();

      if (allAccounts.length) {
        setSelectedAccount(allAccounts[0]);
        setAccount(allAccounts);
        localStorage.setItem("selectedAccount", JSON.stringify(allAccounts[0]));
      } else {
        message.error("No accounts found in your extension.");
      }
    } catch (error) {
      message.error(`Error connecting wallet: ${error}`);
    }
  }

  function disconnectWallet() {
    setSelectedAccount(null);
    localStorage.removeItem("selectedAccount");
    setIsModalOpen(false);
    message.success("Wallet disconnected.");
  }

  function handleCopyAddress() {
    if (selectedAccount) {
      navigator.clipboard.writeText(selectedAccount.address);
      message.success("Address copied to clipboard");
    }
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      {!selectedAccount ? (
        <Button type="primary" onClick={connectWallet}>
          Connect Wallet
        </Button>
      ) : (
        <div>
          <Button type="primary" onClick={handleOpenModal}>
            {`${selectedAccount.address.slice(
              0,
              4
            )}...${selectedAccount.address.slice(-4)}`}
          </Button>
        </div>
      )}

      <Modal
        title="Wallet Options"
        visible={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        <p>Address: {selectedAccount?.address}</p>
        <div className="flex gap-3 items-center">
          <Button className="mt-2" type="default" onClick={handleCopyAddress}>
            Copy Address
          </Button>
          <Button
            danger
            type="primary"
            onClick={disconnectWallet}
            style={{ marginTop: "10px" }}
          >
            Disconnect Wallet
          </Button>
        </div>
      </Modal>
    </>
  );
}
