import { useState, tableHeader } from "react";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import logo from "../../../assets/header/montalban-logo.png";
const PrintPDF = ({ inquiries, tableHeader }) => {
  const DateFormat = (date) => {
    const dateFormat = date === undefined ? "" : date.substr(0, 10);
    return dateFormat;
  };
  console.log("table", inquiries);
  const styles = StyleSheet.create({
    body: {
      padding: 35,
    },
    letterHead: {
      view1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      },
      image: {
        width: 70,
      },
      view2: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      republic: {
        fontFamily: "Times-Roman",
        fontSize: 14,
      },
      municipality: {
        fontFamily: "Times-Roman",
        fontSize: 14,
        lineHeight: 1,
      },
      brgy: {
        fontFamily: "Helvetica-Bold",
        fontSize: 20,
        fontWeight: 700,
      },
      address: {
        fontFamily: "Times-Roman",
        fontSize: 12,
      },
    },
    title: {
      view1: {
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      req: {
        fontSize: 18,
        fontFamily: "Helvetica-Bold",
        fontWeight: 700,
        textDecoration: "underline",
      },
    },
    table: {
      tableHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      },
      tableHeaderCell: {
        backgroundColor: "#295141",
        paddingHorizontal: 8,
        paddingVertical: 6,
        fontSize: 8,
        color: "#fff", // Dark text color for readability
        flex: 1, // Distributes space evenly across the row
        textAlign: "center",
        borderWidth: 0.5,
        borderColor: "#fff",
        textTransform: "uppercase",
      },
      tableRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        backgroundColor: "#f8f8f8", // Alternating row color for better readability
      },
      tableCell: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        fontSize: 8,
        color: "#333", // Dark text color for readability
        flex: 1, // Distributes space evenly across the row
        textAlign: "center", // Center-align text
      },
      detailsCell: {
        width: '30%', // Larger width for details cell
        textAlign: 'center',
        fontSize: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        color: "#333",
      },
      userImage: {
        width: 30, // Set appropriate width
        height: 30, // Set appropriate height
        borderRadius: 15, // Circular image
      },
      userIcon: {
        width: 100,
        paddingHorizontal: 22,
        paddingVertical: 4,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center", // Aligns content vertically
        display: "flex", // Enables flexbox layout
      },

      statusText: {
        color: "#fff", // White text color
        fontSize: 8,
        textAlign: "center",
      },
      completed: {
        backgroundColor: "#4CAF50", // Green background
        borderRadius: 5,
        paddingHorizontal: 2,
        paddingVertical: 4,
      },
      pending: {
        backgroundColor: "#F44336", // Red background
        borderRadius: 5,
        padding: 4,
      },
      inprogress: {
        backgroundColor: "#FFC107", // Amber background
        borderRadius: 5,
        padding: 4,
      },
    },
  });
  console.log(tableHeader);
  const LetterHead = () => (
    <View style={styles.letterHead.view1}>
      <Image src={logo} alt="" srcset="" style={styles.letterHead.image} />
      <View style={styles.letterHead.view2}>
        <Text style={styles.letterHead.republic}>
          Republic of the Philippines
        </Text>
        <Text style={styles.letterHead.brgy}>
          Municipality of Rodriguez, Rizal
        </Text>
        <Text style={styles.letterHead.address}>
          Barangay Hall, Dike Street, Rodriguez, Rizal | +63 (2) 8 948 0157
        </Text>
      </View>
      <Image src={logo} alt="" srcset="" style={styles.letterHead.image} />
    </View>
  );

  const Title = () => (
    <View style={styles.title.view1}>
      <Text style={styles.title.req}>INQUIRIES LIST</Text>
    </View>
  );

  const Table = () => (
    <View>
      <View style={styles.table.tableHeader}>
        {tableHeader.map(
          (header, idx) =>
            header !== "actions" &&(
              <Text key={idx} style={styles.table.tableHeaderCell}>
                {header}
              </Text>
            )
        )}
      </View>
      <View>
      {inquiries.map((item, index) => (
        <View key={index} style={styles.table.tableRow}>
          <Text style={styles.table.tableCell}>
           {item.inq_id}
          </Text>
          <Text style={styles.table.tableCell}>{item.name}</Text>
          <Text style={styles.table.tableCell}>{item.email}</Text>
          <Text style={styles.table.tableCell}>{DateFormat(item.compose.date) || ""}</Text>
          <View style={styles.table.tableCell}>
            {item.isApproved === "Completed" && (
              <View style={styles.table.completed}>
                <Text style={styles.table.statusText}>COMPLETED</Text>
              </View>
            )}
            {item.isApproved === "Pending" && (
              <View style={styles.table.pending}>
                <Text style={styles.statusText}>PENDING</Text>
              </View>
            )}
            {item.isApproved === "In Progress" && (
              <View style={styles.table.inprogress}>
                <Text style={styles.table.statusText}>IN PROGRESS</Text>
              </View>
            )}
          </View>
        </View>
      ))}
      </View>
    </View>
  );
  return (
    <Document>
      <Page size="LEGAL" style={styles.body}>
        <LetterHead />
        <Title />
        <Table />
      </Page>
    </Document>
  );
};

export default PrintPDF;
