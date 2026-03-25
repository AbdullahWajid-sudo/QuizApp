import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 15,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    fontFamily: "Times-Roman",
  },
  border: {
    flex: 1,
    borderWidth: 4,
    borderColor: "#1e293b",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    objectFit: "contain",
  },
  header: {
    fontSize: 34,
    marginBottom: 20,
    marginTop: 10,
    color: "#1e293b",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 10,
  },
  name: {
    fontSize: 32,
    color: "#7c3aed",
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 5,
  },
  quizTitle: {
    fontSize: 24,
    color: "#0f172a",
    fontWeight: "bold",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    borderTopWidth: 2,
    borderTopColor: "#e2e8f0",
    paddingTop: 20,
  },
  statBox: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 10,
    color: "#94a3b8",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    color: "#0f172a",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 12,
    color: "#64748b",
  },
  signatureContainer: {
    alignItems: "center",
  },
  signatureImage: {
    width: 100,
    height: 40,
    marginBottom: 5,
    objectFit: "contain",
  },
  signatureLine: {
    fontSize: 10,
    color: "#64748b",
    borderTopWidth: 1,
    borderTopColor: "#94a3b8",
    paddingTop: 5,
    width: 140,
    textAlign: "center",
  },
  encouragement: {
    fontSize: 12,
    color: "#475569",
    marginBottom: 40,
    fontStyle: "italic",
    textAlign: "center",
  },
});