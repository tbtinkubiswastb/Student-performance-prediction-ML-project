import pandas as pd
from sklearn.linear_model import LinearRegression, Ridge, BayesianRidge
from sklearn.svm import SVR
import json

# Load dataset
df = pd.read_csv('dataset.csv')

# Use exactly 6 features matching the frontend inputs
features = ['study_hours_per_day', 'sleep_hours', 'phone_usage_hours', 'attendance_percentage', 'focus_score', 'stress_level']
X = df[features].fillna(0)
y = df['productivity_score'].fillna(0) # Targeting productivity_score for realistic 90+ outputs

# Define models that produce linear weights
models = {
    'linear': LinearRegression(),
    'logistic': Ridge(),
    'svm': SVR(kernel='linear'),
    'naive_bayes': BayesianRidge()
}

model_data = {}

# Train and extract
for name, model in models.items():
    model.fit(X, y)
    
    weights_list = model.coef_.ravel().tolist()
    if hasattr(model.intercept_, "__len__"):
        bias_value = float(model.intercept_[0])
    else:
        bias_value = float(model.intercept_)

    model_data[name] = {
        'weights': weights_list,
        'bias': bias_value
    }

# Save to JS file
with open('model_weights.js', 'w') as f:
    f.write("const modelWeights = " + json.dumps(model_data, indent=4) + ";\n")

print("Training complete. model_weights.js has been generated successfully.")