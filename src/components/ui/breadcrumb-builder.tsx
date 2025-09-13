import React from "react";
import { Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  useBreadcrumb,
} from "@/components/ui/breadcrumb";

export const BreadcrumbBuilder = () => {
  const { items } = useBreadcrumb();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((crumb, index) => (
          <React.Fragment key={crumb.title}>
            {index !== 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {crumb.url ? (
                <BreadcrumbLink
                  className="text-primary hover:text-accent font-semibold"
                  asChild
                >
                  <Link to={crumb.url}>{crumb.title}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="font-medium">
                  {crumb.title}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
