// src/screens/DashboardPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart, PieChart } from 'react-native-chart-kit';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============ CONSTANTS ============
const SECTOR_IMAGES: Record<string, string> = {
  Tech: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
  Healthcare: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop',
  Finance: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop',
  Marketing: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
};

const CHART_COLORS = {
  tech: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#2563eb'],
  company: ['#10b981', '#34d399', '#6ee7b7', '#059669', '#047857'],
  country: ['#f59e0b', '#fbbf24', '#fcd34d', '#d97706', '#b45309'],
  indiaRemote: ['#ef4444', '#fca5a5'],
  globalRemote: ['#8b5cf6', '#c4b5fd'],
  source: ['#ec4899', '#f472b6', '#fbcfe8', '#be185d', '#9d174d'],
};

interface JobData {
  title: string;
  company: string;
  location: string;
  country: string;
  platformName: string;
  sector: string;
}

const manualJobData: JobData[] = [
  { title: 'Senior Software Engineer (Java)', company: 'Google', location: 'Mountain View, CA, USA', country: 'USA', platformName: 'JSearch', sector: 'Tech' },
  { title: 'Data Scientist', company: 'Microsoft', location: 'Bangalore, KA, India', country: 'India', platformName: 'JSearch', sector: 'Tech' },
  { title: 'Cloud DevOps Engineer', company: 'Amazon AWS', location: 'Seattle, WA, USA', country: 'USA', platformName: 'JSearch', sector: 'Tech' },
  { title: 'Product Manager, AI', company: 'NVIDIA', location: 'Santa Clara, CA, USA', country: 'USA', platformName: 'JSearch', sector: 'Tech' },
  { title: 'Backend Developer', company: 'Swiggy', location: 'Bangalore, KA, India', country: 'India', platformName: 'JSearch', sector: 'Tech' },
  { title: 'Cybersecurity Analyst', company: 'Deloitte', location: 'Hyderabad, TS, India', country: 'India', platformName: 'JSearch', sector: 'Tech' },
  { title: 'Frontend Developer', company: 'Meta', location: 'London, UK', country: 'UK', platformName: 'Adzuna', sector: 'Tech' },
  { title: 'Registered Nurse', company: 'Mayo Clinic', location: 'Rochester, MN, USA', country: 'USA', platformName: 'JSearch', sector: 'Healthcare' },
  { title: 'Medical Researcher', company: 'Pfizer', location: 'Remote', country: 'Remote', platformName: 'Remotive', sector: 'Healthcare' },
  { title: 'Hospital Administrator', company: 'Apollo Hospitals', location: 'Chennai, TN, India', country: 'India', platformName: 'Naukri', sector: 'Healthcare' },
  { title: 'Surgeon', company: 'Fortis', location: 'Delhi, India', country: 'India', platformName: 'JSearch', sector: 'Healthcare' },
  { title: 'Investment Banker', company: 'JP Morgan', location: 'New York, USA', country: 'USA', platformName: 'LinkedIn', sector: 'Finance' },
  { title: 'Financial Analyst', company: 'Goldman Sachs', location: 'Bangalore, India', country: 'India', platformName: 'JSearch', sector: 'Finance' },
  { title: 'Chartered Accountant', company: 'Deloitte', location: 'Mumbai, India', country: 'India', platformName: 'Naukri', sector: 'Finance' },
  { title: 'Digital Marketing Manager', company: 'Ogilvy', location: 'Mumbai, India', country: 'India', platformName: 'Naukri', sector: 'Marketing' },
  { title: 'SEO Specialist', company: 'Moz', location: 'Remote', country: 'Remote', platformName: 'Remotive', sector: 'Marketing' },
  { title: 'Brand Manager', company: 'Unilever', location: 'London, UK', country: 'UK', platformName: 'Adzuna', sector: 'Marketing' },
];

// ============ UTILITY FUNCTIONS ============
function getTopN(items: string[], topN: number): { labels: string[]; data: number[] } {
  const counts: Record<string, number> = {};
  items.forEach((item) => {
    if (item && typeof item === 'string') {
      const cleanedItem = item.trim();
      if (cleanedItem) counts[cleanedItem] = (counts[cleanedItem] || 0) + 1;
    }
  });
  const sorted = Object.entries(counts).sort(([, a], [, b]) => b - a);
  const topItems = sorted.slice(0, topN);
  return {
    labels: topItems.map((item) => item[0]),
    data: topItems.map((item) => item[1]),
  };
}

function categorizeJobField(title: string): string {
  if (!title) return 'Other';
  const t = title.toLowerCase();
  if (t.includes('data') || t.includes('analyst')) return 'Data & Analytics';
  if (t.includes('engineer') || t.includes('developer') || t.includes('java')) return 'Engineering';
  if (t.includes('product')) return 'Product Mgmt';
  if (t.includes('cyber') || t.includes('security')) return 'Security';
  if (t.includes('nurse')) return 'Nursing';
  if (t.includes('doctor') || t.includes('surgeon')) return 'Medical';
  if (t.includes('banker') || t.includes('investment')) return 'Banking';
  if (t.includes('accountant') || t.includes('tax')) return 'Accounting';
  if (t.includes('marketing') || t.includes('seo') || t.includes('brand')) return 'Marketing';
  return 'Other';
}

// ============ ANIMATION COMPONENTS ============
interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  style?: any;
}

const FadeInView: React.FC<FadeInViewProps> = ({ children, delay = 0, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 800,
        delay,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[style, { opacity: fadeAnim, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
};

interface ScalePressableProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
}

const ScalePressable: React.FC<ScalePressableProps> = ({ children, onPress, style }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleAnim }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

// ============ SUB COMPONENTS ============
interface SectorCardProps {
  name: string;
  icon: string;
  image: string;
  onClick: () => void;
  delay?: number;
}

const SectorCard: React.FC<SectorCardProps> = ({ name, icon, image, onClick, delay = 0 }) => (
  <FadeInView delay={delay} style={styles.sectorCardWrapper}>
    <ScalePressable onPress={onClick} style={styles.sectorCard}>
      <Image source={{ uri: image }} style={styles.cardBgImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']}
        style={styles.cardOverlay}
      >
        <Text style={styles.cardIcon}>{icon}</Text>
        <Text style={styles.cardTitle}>{name}</Text>
      </LinearGradient>
    </ScalePressable>
  </FadeInView>
);

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  delay?: number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, delay = 0, color = '#3b82f6' }) => (
  <FadeInView delay={delay} style={styles.statCardWrapper}>
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <View style={styles.statTrendContainer}>
        <Text style={styles.statTrendIcon}>↑</Text>
        <Text style={styles.statDesc}>{trend}</Text>
      </View>
    </View>
  </FadeInView>
);

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, children, delay = 0 }) => (
  <FadeInView delay={delay} style={styles.chartContainer}>
    <Text style={styles.chartTitle}>{title}</Text>
    <View style={styles.chartWrapper}>{children}</View>
  </FadeInView>
);

// ============ MAIN COMPONENT ============
const DashboardPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const handleSelectSector = (sector: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedSector(sector);
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedSector(null);
  };

  // ============ SELECTION SCREEN ============
  if (!selectedSector) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.selectionContainer}>
        <LinearGradient
          colors={['#ffffff', '#e2e8f0']}
          style={StyleSheet.absoluteFillObject}
        />
        
        <FadeInView delay={0}>
          <Text style={styles.selectionTitle}>Market Intelligence</Text>
        </FadeInView>
        
        <FadeInView delay={100}>
          <Text style={styles.selectionSubtitle}>
            Select a specific sector to unlock real-time analysis.
          </Text>
        </FadeInView>

        <View style={styles.cardsGrid}>
          <SectorCard
            name="Tech"
            icon="💻"
            image={SECTOR_IMAGES.Tech}
            onClick={() => handleSelectSector('Tech')}
            delay={200}
          />
          <SectorCard
            name="Healthcare"
            icon="🏥"
            image={SECTOR_IMAGES.Healthcare}
            onClick={() => handleSelectSector('Healthcare')}
            delay={300}
          />
          <SectorCard
            name="Finance"
            icon="📈"
            image={SECTOR_IMAGES.Finance}
            onClick={() => handleSelectSector('Finance')}
            delay={400}
          />
          <SectorCard
            name="Marketing"
            icon="📢"
            image={SECTOR_IMAGES.Marketing}
            onClick={() => handleSelectSector('Marketing')}
            delay={500}
          />
        </View>
      </ScrollView>
    );
  }

  // ============ DASHBOARD SCREEN ============
  const filteredData = manualJobData.filter((job) => job.sector === selectedSector);
  const activeJobsCount = filteredData.length * 150 + 342;
  const avgSalary = selectedSector === 'Tech' ? '$95k' : selectedSector === 'Finance' ? '$88k' : '$72k';

  // Prepare chart data
  const jobFields = filteredData.map((job) => categorizeJobField(job.title));
  const jobFieldsData = getTopN(jobFields, 5);

  const companyData = getTopN(filteredData.map((j) => j.company), 5);
  
  const countries = filteredData.map((job) => job.country).filter((c) => c && c !== 'Remote');
  const countryData = getTopN(countries, 5);

  const jobsInIndia = filteredData.filter((job) => job.country === 'India');
  const remoteInIndiaCount = jobsInIndia.filter((job) =>
    job.location.toLowerCase().includes('remote')
  ).length;

  const jobsOutsideIndia = filteredData.filter((job) => job.country !== 'India');
  const remoteOutsideIndiaCount = jobsOutsideIndia.filter(
    (job) => job.country === 'Remote' || job.location.toLowerCase().includes('remote')
  ).length;

  const platformData = getTopN(filteredData.map((j) => j.platformName), 5);

  // Chart config
  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(51, 65, 85, ${opacity})`,
    style: { borderRadius: 16 },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#e2e8f0',
    },
  };

  const chartWidth = SCREEN_WIDTH - 70;

  return (
   
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <FadeInView delay={0}>
        <ImageBackground
          source={{ uri: SECTOR_IMAGES[selectedSector] }}
          style={styles.dashboardHeader}
        >
          <LinearGradient
            colors={['rgba(15, 23, 42, 0.8)', 'rgba(15, 23, 42, 0.6)']}
            style={styles.headerOverlay}
          >
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.headerTitle}>{selectedSector.toUpperCase()}</Text>
                <Text style={styles.headerSubtitle}>Global Market Overview & Hiring Trends</Text>
              </View>
              <ScalePressable onPress={handleBack} style={styles.backBtn}>
                <Text style={styles.backBtnText}>← Change Sector</Text>
              </ScalePressable>
            </View>
          </LinearGradient>
        </ImageBackground>
      </FadeInView>

      {/* Dashboard Content */}
      <View style={styles.dashboardContent}>
        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Active Jobs"
            value={activeJobsCount.toLocaleString()}
            trend="+12% vs last month"
            delay={100}
            color="#3b82f6"
          />
          <StatCard
            title="Average Salary"
            value={avgSalary}
            trend="+5% vs last year"
            delay={200}
            color="#10b981"
          />
          <StatCard
            title="Top Location"
            value="United States"
            trend="High Demand"
            delay={300}
            color="#f59e0b"
          />
          <StatCard
            title="Remote Availability"
            value="34%"
            trend="Stable"
            delay={400}
            color="#8b5cf6"
          />
        </View>

        {/* Charts */}
        <View style={styles.chartsSection}>
          {/* Most In-Demand Roles */}
          <ChartContainer title="Most In-Demand Roles" delay={200}>
            {jobFieldsData.labels.length > 0 ? (
              <BarChart
                data={{
                  labels: jobFieldsData.labels.map((l) => l.substring(0, 10)),
                  datasets: [{ data: jobFieldsData.data }],
                }}
                width={chartWidth}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                }}
                style={styles.chart}
                fromZero
                showValuesOnTopOfBars
                 yAxisLabel=""        
                 yAxisSuffix="" 
              />
            ) : (
              <Text style={styles.noDataText}>No data available</Text>
            )}
          </ChartContainer>

          {/* Top Hiring Companies */}
          <ChartContainer title="Top Hiring Companies" delay={300}>
            {companyData.labels.length > 0 ? (
              <BarChart
                data={{
                  labels: companyData.labels.map((l) => l.substring(0, 8)),
                  datasets: [{ data: companyData.data }],
                }}
                width={chartWidth}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                }}
                style={styles.chart}
                fromZero
                showValuesOnTopOfBars
                 yAxisLabel=""        
                 yAxisSuffix="" 
              />
            ) : (
              <Text style={styles.noDataText}>No data available</Text>
            )}
          </ChartContainer>

          {/* Global Hotspots */}
          <ChartContainer title="Global Hotspots" delay={400}>
            {countryData.labels.length > 0 ? (
              <BarChart
                data={{
                  labels: countryData.labels,
                  datasets: [{ data: countryData.data }],
                }}
                width={chartWidth}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`,
                }}
                style={styles.chart}
                fromZero
                showValuesOnTopOfBars
                 yAxisLabel=""        
                 yAxisSuffix="" 
              />
            ) : (
              <Text style={styles.noDataText}>No data available</Text>
            )}
          </ChartContainer>

          {/* Pie Charts Row */}
          <View style={styles.pieChartsRow}>
            {/* Work Mode: India */}
            <ChartContainer title="Work Mode: India" delay={500}>
              <PieChart
                data={[
                  {
                    name: 'On-site',
                    population: Math.max(jobsInIndia.length - remoteInIndiaCount, 0),
                    color: '#ef4444',
                    legendFontColor: '#334155',
                    legendFontSize: 12,
                  },
                  {
                    name: 'Remote',
                    population: remoteInIndiaCount,
                    color: '#fca5a5',
                    legendFontColor: '#334155',
                    legendFontSize: 12,
                  },
                ]}
                width={chartWidth}
                height={180}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </ChartContainer>

            {/* Work Mode: Global */}
            <ChartContainer title="Work Mode: Global" delay={600}>
              <PieChart
                data={[
                  {
                    name: 'On-site',
                    population: Math.max(jobsOutsideIndia.length - remoteOutsideIndiaCount, 0),
                    color: '#8b5cf6',
                    legendFontColor: '#334155',
                    legendFontSize: 12,
                  },
                  {
                    name: 'Remote',
                    population: remoteOutsideIndiaCount,
                    color: '#c4b5fd',
                    legendFontColor: '#334155',
                    legendFontSize: 12,
                  },
                ]}
                width={chartWidth}
                height={180}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </ChartContainer>
          </View>

          {/* Data Sources */}
          <ChartContainer title="Data Sources" delay={700}>
            {platformData.labels.length > 0 ? (
              <PieChart
                data={platformData.labels.map((label, index) => ({
                  name: label,
                  population: platformData.data[index],
                  color: CHART_COLORS.source[index % CHART_COLORS.source.length],
                  legendFontColor: '#334155',
                  legendFontSize: 12,
                }))}
                width={chartWidth}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            ) : (
              <Text style={styles.noDataText}>No data available</Text>
            )}
          </ChartContainer>
        </View>
      </View>
    </ScrollView>
  );
};

// ============ STYLES ============
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  
  // Selection Screen
  selectionContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  selectionTitle: {
    fontSize: 40,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 10,
    textAlign: 'center',
  },
  selectionSubtitle: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 40,
    textAlign: 'center',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    width: '100%',
  },
  sectorCardWrapper: {
    width: (SCREEN_WIDTH - 60) / 2,
  },
  sectorCard: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardBgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  // Dashboard Screen
  dashboardHeader: {
    width: '100%',
    height: 220,
  },
  headerOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 15,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: 'white',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '300',
  },
  backBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    marginBottom:25,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  backBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },

  // Dashboard Content
  dashboardContent: {
    marginTop: -30,
    paddingHorizontal: 15,
    paddingBottom: 40,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCardWrapper: {
    width: (SCREEN_WIDTH - 42) / 2,
    
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statTitle: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 24,
    color: '#0f172a',
    fontWeight: '800',
    marginVertical: 4,
  },
  statTrendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statTrendIcon: {
    fontSize: 14,
    color: '#10b981',
    marginRight: 4,
  },
  statDesc: {
    fontSize: 10,
    color: '#10b981',
    fontWeight: '600',
  },

  // Charts
  chartsSection: {
    gap: 15,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  chartTitle: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '700',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  chartWrapper: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: 12,
  },
  noDataText: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 14,
    paddingVertical: 40,
  },
  pieChartsRow: {
    gap: 15,
  },
});

export default DashboardPage;