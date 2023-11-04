use std::{env::current_dir, fs};

use fury_rover_health_computer::HealthComputer;
use schemars::schema_for;

fn main() -> std::io::Result<()> {
    let mut out_dir = current_dir().unwrap();
    out_dir.push("schema");
    fs::create_dir_all(&out_dir).unwrap();
    let path = out_dir.join("fury-rover-health-computer.json");

    let schema = schema_for!(HealthComputer);
    let output = serde_json::to_string_pretty(&schema).unwrap();
    fs::write(path, output)?;

    Ok(())
}
