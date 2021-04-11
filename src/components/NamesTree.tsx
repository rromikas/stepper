import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import { useState } from "react";
import ArrowDown from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  nodeText: {
    color: "gray",
  },

  container: {
    minHeight: 400,
  },

  objectContainer: {
    padding: "0 30px",
  },

  sourceContainer: {
    borderRight: "1px solid gray",
  },
});

const RecursiveNode = ({ nodeKey, node }) => {
  const [expand, setExpand] = useState(false);
  const classes = useStyles();
  return (
    <div>
      <Box
        display="flex"
        onDragStart={(e) => {
          e.dataTransfer.setData("nodeKey", nodeKey);
          e.dataTransfer.setData("node", JSON.stringify(node));
        }}
        draggable
        onClick={() => setExpand((prev) => !prev)}
      >
        <ArrowDown
          style={{
            transition: "transform 0.2s",
            transform: `rotate(${expand ? "-90deg" : "0"})`,
          }}
        ></ArrowDown>
        <div className={classes.nodeText}>{nodeKey}</div>
      </Box>
      <Collapse in={expand}>
        <Box pl={2}>
          {typeof node === "object"
            ? Object.keys(node).map((x, i) => {
                return (
                  <RecursiveNode
                    key={Math.random() + "-" + x}
                    nodeKey={x}
                    node={node[x]}
                  ></RecursiveNode>
                );
              })
            : null}
        </Box>
      </Collapse>
    </div>
  );
};

export interface NamesTreeProps {
  source: any;
  target: any;
  setTarget: Function;
}

const NamesTree: React.FC<NamesTreeProps> = ({ source, target, setTarget }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Grid container className={classes.container}>
        <Grid item xs={6} className={classes.sourceContainer + " " + classes.objectContainer}>
          <Box mb={4} className={classes.title}>
            Source
          </Box>
          <Box>
            {Object.keys(source).map((x, i) => (
              <RecursiveNode
                key={Math.random() + "-" + x}
                node={source[x]}
                nodeKey={x}
              ></RecursiveNode>
            ))}
          </Box>
        </Grid>
        <Grid
          className={classes.objectContainer}
          item
          xs={6}
          onDrop={(e) => {
            e.preventDefault();
            const nodeKey = e.dataTransfer.getData("nodeKey");
            const node = JSON.parse(e.dataTransfer.getData("node"));
            setTarget({ ...target, [nodeKey]: node });
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <Box mb={4} className={classes.title}>
            Target
          </Box>
          {Object.keys(target).map((x, i) => (
            <RecursiveNode
              key={Math.random() + "-" + x}
              node={target[x]}
              nodeKey={x}
            ></RecursiveNode>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NamesTree;
