"use client";

import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <Content className="p-6 min-h-screen">{children}</Content>
    </Layout>
  );
};

export default MainLayout;
