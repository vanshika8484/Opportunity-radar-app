import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  FlatList 
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COMPANIES, ROLES } from '../../data/interviewQuestions';
import { Company, Role } from '../../types/interview';

type Step = 'company' | 'role' | 'confirm';

export default function MockInterviewSetup() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('company');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = COMPANIES.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setStep('role');
    setSearchQuery('');
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setStep('confirm');
  };

  const handleBack = () => {
    if (step === 'role') {
      setStep('company');
      setSelectedCompany(null);
    } else if (step === 'confirm') {
      setStep('role');
      setSelectedRole(null);
    }
  };

  const handleStartInterview = () => {
    if (selectedCompany && selectedRole) {
      router.push({
        pathname: '/mock-interview/session',
        params: {
          companyId: selectedCompany.id,
          companyName: selectedCompany.name,
          companyLogo: selectedCompany.logo,
          companyColor: selectedCompany.color,
          roleId: selectedRole.id,
          roleName: selectedRole.name,
          roleIcon: selectedRole.icon,
        }
      });
    }
  };

  const renderCompanyStep = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.stepIndicator}>Step 1 of 2</Text>
        <Text style={styles.title}>Select Company</Text>
        <Text style={styles.subtitle}>
          Choose the company you're preparing for
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search companies..."
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredCompanies}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.companyRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.companyCard,
              selectedCompany?.id === item.id && styles.companyCardSelected
            ]}
            onPress={() => handleCompanySelect(item)}
          >
            <Text style={styles.companyLogo}>{item.logo}</Text>
            <Text style={styles.companyName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.companyList}
        showsVerticalScrollIndicator={false}
      />
    </>
  );

  const renderRoleStep = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.stepIndicator}>Step 2 of 2</Text>
        <Text style={styles.title}>Select Role</Text>
        <Text style={styles.subtitle}>
          Choose your target position at {selectedCompany?.name}
        </Text>
      </View>

      <View style={styles.selectedCompanyBadge}>
        <Text style={styles.selectedCompanyLogo}>{selectedCompany?.logo}</Text>
        <Text style={styles.selectedCompanyName}>{selectedCompany?.name}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {ROLES.map((role) => (
          <TouchableOpacity
            key={role.id}
            style={[
              styles.roleCard,
              selectedRole?.id === role.id && styles.roleCardSelected
            ]}
            onPress={() => handleRoleSelect(role)}
          >
            <Text style={styles.roleIcon}>{role.icon}</Text>
            <View style={styles.roleContent}>
              <Text style={styles.roleName}>{role.name}</Text>
              <Text style={styles.roleDescription}>{role.description}</Text>
            </View>
            <Text style={styles.roleArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  const renderConfirmStep = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Ready to Start?</Text>
        <Text style={styles.subtitle}>
          Review your selection and begin the interview
        </Text>
      </View>

      <View style={styles.confirmCard}>
        <View style={styles.confirmSection}>
          <Text style={styles.confirmLabel}>Company</Text>
          <View style={styles.confirmValue}>
            <Text style={styles.confirmIcon}>{selectedCompany?.logo}</Text>
            <Text style={styles.confirmText}>{selectedCompany?.name}</Text>
          </View>
        </View>

        <View style={styles.confirmDivider} />

        <View style={styles.confirmSection}>
          <Text style={styles.confirmLabel}>Role</Text>
          <View style={styles.confirmValue}>
            <Text style={styles.confirmIcon}>{selectedRole?.icon}</Text>
            <Text style={styles.confirmText}>{selectedRole?.name}</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoIcon}>ℹ️</Text>
        <View style={styles.infoContent}>
          <Text style={styles.infoTitle}>What to expect</Text>
          <Text style={styles.infoText}>
            • 5 interview questions tailored to {selectedCompany?.name}
          </Text>
          <Text style={styles.infoText}>
            • Questions specific to {selectedRole?.name} role
          </Text>
          <Text style={styles.infoText}>
            • Record your answers using voice input
          </Text>
          <Text style={styles.infoText}>
            • Review all your responses at the end
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={handleStartInterview}>
        <Text style={styles.startButtonText}>Start Interview</Text>
        <Text style={styles.startButtonIcon}>🎤</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {step === 'company' && renderCompanyStep()}
        {step === 'role' && renderRoleStep()}
        {step === 'confirm' && renderConfirmStep()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '600',
  },
  stepIndicator: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  companyList: {
    paddingBottom: 20,
  },
  companyRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  companyCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  companyCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  companyLogo: {
    fontSize: 40,
    marginBottom: 12,
  },
  companyName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  selectedCompanyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  selectedCompanyLogo: {
    fontSize: 24,
    marginRight: 10,
  },
  selectedCompanyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  roleCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  roleIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  roleContent: {
    flex: 1,
  },
  roleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  roleArrow: {
    fontSize: 20,
    color: '#9ca3af',
  },
  confirmCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  confirmSection: {
    marginBottom: 16,
  },
  confirmLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  confirmValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  confirmText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  confirmDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  infoCard: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1e40af',
    marginBottom: 4,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#6366f1',
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  startButtonIcon: {
    fontSize: 20,
  },
});